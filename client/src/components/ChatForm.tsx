// client/src/components/ChatForm.tsx
import React, { useState } from "react";

const ChatForm: React.FC = () => {
    const [sender, setSender] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting chat:", { sender, message });

        try {
            const response = await fetch("/api/conversations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sender, message }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from API:", data);
            setFeedback("Message sent successfully!");
            // Optionally clear the form fields
            setSender("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            setFeedback("Failed to send message.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Sender:
                        <input
                            type="text"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="Your name"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Message:
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                    </label>
                </div>
                <button type="submit">Send Message</button>
            </form>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default ChatForm;
