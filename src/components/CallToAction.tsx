import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Users } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <Card className="bg-gradient-hero border-0 shadow-glow overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          
          <CardContent className="relative p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Learning Journey?
                </span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join over 50,000 learners who've already revolutionized their study methods. 
                Start creating AI-powered courses in minutes, not hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-elegant px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg"
                  onClick={() => {
                    window.open('https://youtube.com/watch?v=demo', '_blank');
                  }}
                >
                  View Examples
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">✨ Free</div>
                  <div className="text-white/70">No credit card required</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">⚡ Instant</div>
                  <div className="text-white/70">Generate courses in seconds</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">🎯 Smart</div>
                  <div className="text-white/70">AI-powered learning optimization</div>
                </div>
              </div>

              <div className="mt-8 text-sm text-white/60">
                Trusted by students from Harvard, MIT, Stanford, and 150+ other universities worldwide
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;