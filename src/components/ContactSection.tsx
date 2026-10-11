import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Send, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Web3Forms - simpler alternative that works immediately
      // Get your access key from https://web3forms.com (it's free)
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
      
      // If access key is not set, use EmailJS as fallback
      if (accessKey === "YOUR_ACCESS_KEY_HERE") {
        // Try EmailJS if configured
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          // Dynamic import for EmailJS
          const emailjs = (await import("@emailjs/browser")).default;
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              to_email: "codebug0527@gmail.com",
            },
            publicKey
          );
        } else {
          throw new Error("Email service not configured. Please set up Web3Forms or EmailJS.");
        }
      } else {
        // Use Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Contact Form Message from ${formData.name}`,
            to: "codebug0527@gmail.com",
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to send message");
        }
      }

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      
      let errorMessage = "Failed to send message. Please try again or contact me directly at codebug0527@gmail.com";
      
      if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:codebug0527@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/mergeninja0527" },
    { icon: Send, label: "Telegram", href: "https://t.me/mergeninja0527" },
  ];

  return (
    <section id="contact" className="py-32 bg-foreground text-primary-foreground relative overflow-hidden min-h-screen flex full-landing-image">
      {/* Geometric accents */}
      <div className="absolute top-1/4 right-0 w-32 h-px bg-primary-foreground/20" />
      <div className="absolute bottom-1/4 left-0 w-48 h-px bg-primary-foreground/20" />

      <div className="mx-auto" ref={ref} style={{width: "90rem"}}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60">
              Get in Touch
            </span>
            <h2 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              LET'S
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px hsl(0 0% 100%)",
                  color: "transparent",
                }}
              >
                CONNECT
              </span>
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mt-8 leading-relaxed max-w-md">
              Have a project in mind or want to collaborate? I'm always open to discussing new opportunities and ideas.
            </p>

            {/* Social Links */}
            <div className="mt-12 space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-body text-sm tracking-widest uppercase link-underline">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <label className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/60 block mb-3">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-lg focus:outline-none focus:border-primary-foreground transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/60 block mb-3">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-lg focus:outline-none focus:border-primary-foreground transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/60 block mb-3">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b border-primary-foreground/30 py-3 font-body text-lg focus:outline-none focus:border-primary-foreground transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="font-body text-sm tracking-widest uppercase border border-primary-foreground px-12 py-4 hover:bg-primary-foreground hover:text-foreground transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-32 pt-12 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="font-display text-2xl">DENNIS FABROS</span>
          <span className="font-body text-sm text-primary-foreground/60">
            © 2024 All Rights Reserved
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
