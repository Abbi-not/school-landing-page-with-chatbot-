import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Maximize2, Minimize2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    {
      text: "Hello! I'm the Excellence Academy assistant. How can I help you today?",
      isUser: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { text: userText, isUser: true }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId }),
      });

      const data = await res.json();

      // Save sessionId from backend if first message
      if (!sessionId && data.sessionId) setSessionId(data.sessionId);

      const botReply = data?.reply || "Sorry, I couldn't get a reply.";

      setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Network or server error. Please try again.", isUser: false },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const chatWindowClasses = isFullscreen
    ? "fixed inset-4 md:inset-8 w-auto h-auto"
    : "fixed bottom-6 right-6 w-[380px] h-[550px] max-h-[80vh]";

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 transition-all flex items-center justify-center z-50 group ${
          isOpen ? "hidden" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-75" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`${chatWindowClasses} bg-background rounded-3xl shadow-2xl flex flex-col z-50 border border-border overflow-hidden animate-scale-in`}
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-5 flex items-center justify-between relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gold/20 blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full bg-primary-foreground/10 blur-xl" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Academy Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs text-primary-foreground/70">Online • Ready to help</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={toggleFullscreen}
                className="hover:bg-primary-foreground/10 p-2 rounded-xl transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsFullscreen(false);
                  setSessionId(null); // reset session on close
                }}
                className="hover:bg-primary-foreground/10 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
                {!msg.isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center mr-3 shrink-0">
                    <Bot className="w-4 h-4 text-gold-dark" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] p-4 text-sm leading-relaxed ${
                    msg.isUser
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md shadow-lg"
                      : "bg-background text-foreground rounded-2xl rounded-bl-md shadow-md border border-border/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center mr-3 shrink-0">
                  <Bot className="w-4 h-4 text-gold-dark" />
                </div>

                <div className="bg-background text-foreground rounded-2xl rounded-bl-md shadow-md border border-border/50 p-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-5 py-3 border-t border-border/50 bg-background">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {["Admission requirements", "Tuition fees", "Programs offered"].map((action) => (
                <button
                  key={action}
                  onClick={() => setInput(action)}
                  className="shrink-0 px-4 py-2 text-xs font-medium bg-muted hover:bg-muted/80 text-foreground rounded-full transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-background">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 h-12 bg-muted/30 border-border/50 rounded-xl focus-visible:ring-gold/50"
              />

              <Button
                onClick={handleSend}
                size="icon"
                className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-3">
              Powered by AI — English & Amharic supported
            </p>
          </div>
        </div>
      )}
    </>
  );
};
