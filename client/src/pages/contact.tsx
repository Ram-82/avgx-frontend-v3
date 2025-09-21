
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@/shared/schema";
// import { insertContactSchema, type InsertContact } from "../../shared/schema"; 
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Globe, Send, Shield } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  //const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { name: "Twitter", icon: "fab fa-twitter", href: "#", color: "text-accent-teal" },
    { name: "Discord", icon: "fab fa-discord", href: "#", color: "text-accent-purple" },
    { name: "Telegram", icon: "fab fa-telegram", href: "#", color: "text-accent-teal" },
    { name: "GitHub", icon: "fab fa-github", href: "#", color: "text-accent-purple" },
  ];

  return (
    <div className="min-h-screen pt-20 py-20 bg-avgx-primary dark:bg-avgx-primary light:bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            Get in Touch
          </h1>
          <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
            Questions about AVGX? Want to contribute to the project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              Send us a Message
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John" 
                            {...field}
                            className="bg-secondary/50 border-white/10 dark:border-white/10 light:border-gray-200 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 focus:border-accent-teal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe" 
                            {...field}
                            className="bg-secondary/50 border-white/10 dark:border-white/10 light:border-gray-200 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 focus:border-accent-teal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="john@example.com" 
                          {...field}
                          className="bg-secondary/50 border-white/10 dark:border-white/10 light:border-gray-200 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 focus:border-accent-teal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                        Subject
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/50 border-white/10 dark:border-white/10 light:border-gray-200 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 focus:border-accent-teal">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Technical Questions">Technical Questions</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Bug Report">Bug Report</SelectItem>
                          <SelectItem value="Media Inquiry">Media Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your inquiry..."
                          className="bg-secondary/50 border-white/10 dark:border-white/10 light:border-gray-200 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900 focus:border-accent-teal resize-none"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-gradient-to-r from-accent-teal to-emerald-500 hover:shadow-xl hover:shadow-accent-teal/30 transition-all"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </GlassCard>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Connect with Us
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-teal/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-accent-teal w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Email</div>
                    <div className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">contact@avgx.finance</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center">
                    <Globe className="text-accent-purple w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Documentation</div>
                    <div className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">docs.avgx.finance</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center space-x-3 p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-all hover:shadow-lg"
                  >
                    <i className={`${social.icon} ${social.color} text-xl`}></i>
                    <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">{social.name}</span>
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
                Security
              </h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-sm mb-4">
                Found a security vulnerability? Please report it responsibly.
              </p>
              <Button 
                variant="outline"
                className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                <Shield className="mr-2 h-4 w-4" />
                Report Security Issue
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
