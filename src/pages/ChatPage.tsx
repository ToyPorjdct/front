import React, { useState, useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import Chat from '../components/Chat'
import { memberInfo } from '../state/authState'
import { useRecoilState } from 'recoil'

const ChatPage: React.FC = () => {
    const [auth] = useRecoilState(memberInfo)
    const [messages, setMessages] = useState<any[]>([])
    const [sentMessages, setSentMessages] = useState<any[]>([])
    const roomId = 1
    const clientRef = useRef<Client | null>(null)

    const fetchMessages = async () => {
        if (!auth.accessToken) {
            return
        }

        try {
            const response = await fetch(`http://localhost:8080/chat/room/${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch messages')
            }

            const data = await response.json()
            const fetchedMessages = data.result.map((response: any) => ({
                id: response.chatId,
                content: response.message,
                senderId: response.author.id,
                createdAt: response.createdAt,
            }))
            setMessages(fetchedMessages)
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    useEffect(() => {
        if (!auth.accessToken) return

        fetchMessages()

        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            onConnect: () => {
                console.log('STOMP 연결 성공')

                stompClient.subscribe(`/sub/chat.${roomId}`, (message) => {
                    console.log('Received message:', message.body)
                    try {
                        const newMessage = JSON.parse(message.body)
                        setMessages((prevMessages) => addMessageIfUnique(prevMessages, newMessage))
                    } catch (error) {
                        console.error('Error parsing message:', error)
                    }
                })
            },
            onDisconnect: () => {
                console.log('STOMP connection disconnected')
            },
        })

        clientRef.current = stompClient
        stompClient.activate()

        return () => {
            stompClient.deactivate()
        }
    }, [auth.accessToken, roomId])

    const addMessageIfUnique = (prevMessages: any[], newMessage: any) => {
        if (!prevMessages.some((msg) => msg.id === newMessage.chatId)) {
            return [...prevMessages, {
                id: newMessage.chatId,
                content: newMessage.message,
                senderId: newMessage.author.id,
                timestamp: newMessage.createdAt,
            }]
        }
        return prevMessages
    }

    const handleSendMessage = (content: string) => {
        if (clientRef.current && content.trim()) {
            const newMessage = { content }
            setSentMessages((prevSent) => [...prevSent, newMessage])

            clientRef.current.publish({
                destination: `/pub/chat.${roomId}`,
                body: JSON.stringify({ message: content }),
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 overflow-hidden">
            <div className="max-w-2xl mx-auto">
                {/* 채팅 UI만 렌더링 */}
                <Chat
                    currentUserId={auth.id}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default ChatPage
