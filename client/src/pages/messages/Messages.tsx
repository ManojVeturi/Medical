import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth";
import { getMessages, createMessage, getAllDoctors } from "@/lib/api";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Messages() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeChatName, setActiveChatName] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!user) {
      setLocation("/auth/login");
      return;
    }
    
    const loadDoctors = async () => {
      try {
        const doctorsRes = await getAllDoctors();
        const doctorContacts = doctorsRes.map((doc: any, idx: number) => ({
          id: doc.id,
          name: `Dr. ${doc.specialty}`,
          role: doc.specialty,
          online: Math.random() > 0.5,
          img: `https://i.pravatar.cc/150?u=${idx + 20}`,
          unread: 0,
          lastMsg: "Click to start conversation",
        }));
        setContacts(doctorContacts);
        if (doctorContacts.length > 0) {
          setActiveChat(doctorContacts[0].id);
          setActiveChatName(doctorContacts[0].name);
        }
      } catch (err) {
        console.error("Error loading doctors:", err);
      }
    };
    
    loadDoctors();
  }, [user, setLocation]);

  useEffect(() => {
    if (!activeChat || !user) return;
    
    const loadMessages = async () => {
      try {
        const messagesRes = await getMessages(user.id, activeChat);
        setMessages(messagesRes.map((msg: any) => ({
          id: msg.id,
          sender: msg.senderId === user.id ? "me" : "dr",
          content: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };
    
    loadMessages();
  }, [activeChat, user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user) return;
    
    try {
      await createMessage({
        senderId: user.id,
        receiverId: activeChat,
        content: messageInput,
        read: false
      });
      
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "me",
        content: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessageInput("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout role="patient">
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Sidebar - Contacts */}
        <Card className="w-80 flex flex-col h-full border-r-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-lg mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9 bg-muted/50" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col p-2 gap-1">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                    activeChat === contact.id ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.img} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-medium text-sm ${activeChat === contact.id ? "text-primary" : ""}`}>
                        {contact.name}
                      </span>
                      {contact.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] h-5 w-5 flex items-center justify-center rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col h-full shadow-sm overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={contacts.find((c: any) => c.id === activeChat)?.img || "https://i.pravatar.cc/150?u=12"} />
                <AvatarFallback>{activeChatName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm">{activeChatName || "Select a contact"}</h3>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> {contacts.find((c: any) => c.id === activeChat)?.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 bg-muted/10" ref={scrollRef}>
            <div className="space-y-4">
               <div className="flex justify-center">
                 <span className="text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">Today</span>
               </div>
               
               {messages.map((msg) => (
                 <div 
                   key={msg.id} 
                   className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                 >
                   <div className={`
                     max-w-[70%] rounded-2xl px-4 py-3 shadow-sm
                     ${msg.sender === "me" 
                       ? "bg-primary text-primary-foreground rounded-tr-none" 
                       : "bg-card border border-border rounded-tl-none"
                     }
                   `}>
                     <p className="text-sm">{msg.content}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                       {msg.time}
                     </p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Input 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-muted/30"
              />
              <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Smile className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button type="submit" size="icon" className="shrink-0" disabled={!messageInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
