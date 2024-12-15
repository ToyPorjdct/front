import React, { useEffect, useRef } from 'react'
import { Send, User } from 'lucide-react'

interface Message {
  id: string
  senderId: number
  content: string
  timestamp: string
}

interface ChatProps {
  currentUserId: number
  messages: Message[]
  onSendMessage: (content: string) => void
}

const Chat: React.FC<ChatProps> = ({ currentUserId, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = React.useState('')
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (newMessage.trim() === '') return
      onSendMessage(newMessage)
      setNewMessage('')
    }
  
    const formatTime = (timestamp: string) => {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
  
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [messages])
  
    return (
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col" style={{ maxHeight: '600px' }}>
        <div className="bg-blue-500 text-white p-4">
          <h2 className="text-xl font-semibold">채팅</h2>
        </div>
  
        {/* 내부 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100% - 160px)', paddingRight: '10px' }}>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">메시지가 없습니다.</div>
          ) : (
            messages.map((message) => {
              const isMine = message.senderId === currentUserId
              return (
                <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  {!isMine && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
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
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
  
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
