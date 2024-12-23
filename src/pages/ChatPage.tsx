import React, { useState, useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import Chat from '../components/chat/Chat'
import { memberInfo } from '../state/authState'
import { useRecoilState } from 'recoil'
import ChatRoomsList from '../components/chat/ChatRoomsList'

const ChatPage: React.FC = () => {
    const [auth] = useRecoilState(memberInfo)
    const [messages, setMessages] = useState<any[]>([])
    const [sentMessages, setSentMessages] = useState<any[]>([])
    const [activeRoom, setActiveRoom] = useState(1)
    const roomId = activeRoom
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

    const chatRooms = [
        { id: 1, name: '제주도 여행 동행', lastMessage: '언제 출발하시나요?', unread: 2 },
        { id: 2, name: '서울 맛집 투어', lastMessage: '강남역에서 만나요!', unread: 0 },
        { id: 3, name: '부산 해운대 여행', lastMessage: '숙소 예약했어요.', unread: 1 },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row h-screen">
                <ChatRoomsList 
                    chatRooms={chatRooms} 
                    activeRoom={activeRoom} 
                    setActiveRoom={setActiveRoom} 
                />

                <div className="w-full lg:w-2/3 xl:w-3/4 bg-gray-50 flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {chatRooms.find(room => room.id === activeRoom)?.name}
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Chat
                            currentUserId={auth.id}
                            messages={messages}
                            onSendMessage={handleSendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
