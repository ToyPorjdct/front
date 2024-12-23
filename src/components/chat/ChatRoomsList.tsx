import React from 'react'
import { Users, MessageCircle } from 'lucide-react'

interface ChatRoom {
  id: number
  name: string
}

interface ChatRoomsListProps {
  chatRooms: ChatRoom[]
  activeRoom: number
  setActiveRoom: (roomId: number) => void
}

const ChatRoomsList: React.FC<ChatRoomsListProps> = ({ chatRooms, activeRoom, setActiveRoom }) => {
  return (
    <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MessageCircle className="w-6 h-6 mr-2" />
          채팅
        </h2>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {chatRooms.map((room) => (
          <li
            key={room.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out ${
              activeRoom === room.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setActiveRoom(room.id)}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">{room.name}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatRoomsList
