import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export const PdfModal = ({
  isOpen,
  onClose,
  pdfUrl,
  title = "AVGX Whitepaper"
}: PdfModalProps) => {
  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-6xl w-[95vw] h-[90vh] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg border-white/10 dark:border-white/10 light:border-gray-200"
          )}
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between p-4 border-b border-white/10 dark:border-white/10 light:border-gray-200">
            <h2 className="text-xl font-bold text-avgx-text-primary dark:text-avgx-text-primary light:text-gray-900">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-full border-0 rounded-lg overflow-hidden bg-white">
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                className="min-h-[calc(90vh-120px)]"
              >
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Your browser doesn't support PDF viewing.
                    </p>
                    <Button
                      onClick={handleOpenInNewTab}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open PDF in New Tab
                    </Button>
                  </div>
                </div>
              </object>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
