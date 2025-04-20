type Message = {
    prompt: string;
    chat_response?: string;
    timestamp: string;
};

interface Reference {
    content: {
        text: string;
    };
    location: {
        s3Location: {
            uri: string;
        };
        type: string;
    };
    metadata: {
        [key: string]: string;
    };
}


interface MenuItem {
    conversationId: string;
    conversation_name: string;
    isFavorite: boolean;
}

interface SidebarItemProps {
    conversationId: string;
    conversationName: string;
    getConversation: (id: string) => void;
    selected: boolean;
    setSelected: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    onMarkFavorite: (id: string, isFavorite: boolean) => void;
    isFavorite: boolean;
}

type ChatSidebarProps = {
    loadConversation: (conversationId: string) => void;
    isSidebarOpen: boolean;
};

type SidebarHandle = {
    refreshHistory: (userId?: string) => void;
  };