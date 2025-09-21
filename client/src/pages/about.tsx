import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";
import { PdfModal } from "@/components/modals/pdf-modal";

const AboutPage = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const whitepaperUrl = "/avgx-whitepaper.pdf";

  const handleDownloadPdf = () => {
    window.open(whitepaperUrl, '_blank');
  };

  const handleViewOnline = () => {
    setIsPdfModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-20 py-20 bg-gradient-to-b from-avgx-secondary to-avgx-primary dark:from-avgx-secondary dark:to-avgx-primary light:from-gray-50 light:to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
            About AVGX
          </h1>
          <p className="text-xl text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 max-w-3xl mx-auto">
            Building the future of neutral global finance through innovative index methodology and decentralized governance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission & Vision */}
          <div className="space-y-8">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent-teal">Our Mission</h3>
              <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 leading-relaxed">
                AVGX aims to create a truly neutral global currency that combines the stability of major world economies 
                with the innovation and accessibility of cryptocurrency. Our enhanced stability formula with volatility 
                index adjustment ensures reduced volatility while maintaining fair representation of global economic power 
                and decentralized governance.
              </p>
            </GlassCard>
            
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent-purple">Stability Formula</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="font-mono text-sm text-center mb-2">
                    AVGX(t) = √( WF_smoothed(t) × WC_adjusted(t) )
                  </div>
                  <div className="text-xs text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 text-center">
                    where WC_adjusted = WC_smoothed × (1 - σₜ)
                  </div>
                </div>
                <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                  Our enhanced formula incorporates:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>EWMA smoothing to reduce short-term noise</li>
                    <li>Volatility index (σₜ) to dynamically adjust for market stress</li>
                    <li>Daily movement clamping (±1.5%) for stability</li>
                    <li>Transparent intermediate values via debug API</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-3 text-accent-purple">Tokenomics</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Total Supply</span>
                  <span className="font-mono text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Infinite (Algorithmic)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Minting Mechanism</span>
                  <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Stability-Adjusted Index</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Governance</span>
                  <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Future DAO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Backing Assets</span>
                  <span className="text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Multi-Chain Reserves</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Roadmap</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-accent-teal rounded-full"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 1: Index Launch</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Live AVGX index calculation and API</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-accent-teal rounded-full"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 2: Token Integration</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">AVGX token deployment and trading</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-avgx-text-secondary rounded-full"></div>
                  <div>
                    <div className="font-medium text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Phase 3: DAO Governance</div>
                    <div className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">Community-driven parameter updates</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Whitepaper */}
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">AVGX Whitepaper</h3>
            
            {/* PDF Viewer Placeholder */}
            <div className="bg-secondary/50 rounded-xl p-8 h-96 flex items-center justify-center mb-6">
              <div className="text-center">
                <FileText className="w-16 h-16 text-accent-teal mb-4 mx-auto" />
                <p className="text-xl font-medium mb-2 text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">Technical Whitepaper</p>
                <p className="text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600 mb-4">
                  Comprehensive analysis of AVGX methodology, tokenomics, and governance structure
                </p>
                <p className="text-sm text-avgx-text-secondary dark:text-avgx-text-secondary light:text-gray-600">
                  Click "View Online" to read the whitepaper in a popup modal
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-accent-teal to-emerald-500 hover:shadow-lg transition-all"
                onClick={handleDownloadPdf}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white"
                onClick={handleViewOnline}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Online
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={whitepaperUrl}
        title="AVGX Whitepaper"
      />
    </div>
  );
};

export default AboutPage;
