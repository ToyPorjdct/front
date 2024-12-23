import React, { useState, useEffect, useRef } from 'react'
import { Send, User } from 'lucide-react'

interface Message {
  id: string
  senderId: number
  content: string
  createdAt: string
  profileImage: string
}

interface ChatProps {
  currentUserId: number
  messages: Message[]
  onSendMessage: (content: string) => void
}

const Chat: React.FC<ChatProps> = ({ currentUserId, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    onSendMessage(newMessage)
    setNewMessage('')
  }

  const formatTime = (createdAt: string) => {
    const date = new Date(Date.parse(createdAt)) 
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    if (messageContainerRef.current && messagesEndRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-full" style={{ maxHeight: '600px', maxWidth: '700px' }}>
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-semibold">채팅</h2>
      </div>

      {/* 내부 메시지 영역 */}
      <div
        ref={messageContainerRef}
        className="p-4 space-y-4 flex-1"
        style={{
          maxHeight: 'calc(100% - 120px)',
          overflowY: messages.length === 0 ? 'hidden' : 'auto',
        }}
      >
        {messages.length === 0 ? (
          <div className="flex justify-center items-center text-center text-gray-500 h-full">
            <span>메시지가 없습니다.</span>
          </div>
        ) : (
          messages.map((message) => {
            const isMine = message.senderId === currentUserId
            return (
              <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                {!isMine && message.profileImage && (
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={message.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                      isMine
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                    <span>{formatTime(message.createdAt)}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2 w-full">
          {/* 입력창 */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ minWidth: '0', flexGrow: 1 }}
          />
          {/* 전송 버튼 */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
