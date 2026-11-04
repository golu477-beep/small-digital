import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "917070414390";
const quickMessages = [
  "I would like to discuss a website project.",
  "I need help with digital marketing.",
];

function createWhatsAppUrl(message) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${whatsappNumber}?${params.toString()}`;
}

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openWhatsApp = (text) => {
    const trimmedMessage = text.trim();
    if (!trimmedMessage) return;
    window.open(createWhatsAppUrl(trimmedMessage), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="whatsapp-widget">
      {isOpen && (
        <section
          className="whatsapp-panel"
          role="dialog"
          aria-labelledby="whatsapp-panel-title"
        >
          <div className="whatsapp-panel-header">
            <span className="whatsapp-panel-icon" aria-hidden="true">
              <FaWhatsapp />
            </span>
            <div>
              <h2 id="whatsapp-panel-title">Chat with our team</h2>
              <p>Continue the conversation on WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="whatsapp-panel-close"
              aria-label="Close WhatsApp chat panel"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="whatsapp-panel-body">
            <p className="whatsapp-chat-intro">
              Hello! What would you like to talk about?
            </p>
            {quickMessages.map((quickMessage) => (
              <button
                type="button"
                key={quickMessage}
                className="whatsapp-quick-message"
                onClick={() => openWhatsApp(quickMessage)}
              >
                {quickMessage}
              </button>
            ))}

            <form
              className="whatsapp-message-form"
              onSubmit={(event) => {
                event.preventDefault();
                openWhatsApp(message);
              }}
            >
              <label className="sr-only" htmlFor="whatsapp-message">
                Write a message
              </label>
              <input
                id="whatsapp-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your message..."
                maxLength={500}
              />
              <button
                type="submit"
                aria-label="Continue to WhatsApp with your message"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="whatsapp-disclaimer">
              WhatsApp will open in a new tab; your message is not sent from this site.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        className="whatsapp-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
      >
        {isOpen
          ? <X className="h-5 w-5" aria-hidden="true" />
          : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
        <span>{isOpen ? "Close chat" : "Chat with us"}</span>
      </button>
    </div>
  );
}
