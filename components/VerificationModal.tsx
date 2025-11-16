import React, { useState, useRef, useEffect } from 'react';
import CameraIcon from './icons/CameraIcon';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  profilePhoto: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onVerified, profilePhoto }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(1); // 1: instructions, 2: camera, 3: verifying, 4: success
  const [selfie, setSelfie] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStep(2);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions and try again.");
      setStep(1);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  useEffect(() => {
    // Stop camera when modal is closed or component unmounts
    return () => stopCamera();
  }, []);

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      setSelfie(canvas.toDataURL('image/png'));
      stopCamera();
    }
  };
  
  const handleVerify = () => {
      setStep(3); // Show verifying state
      // Simulate AI verification
      setTimeout(() => {
          setStep(4); // Show success
          setTimeout(() => {
              onVerified(); // Call parent handler
          }, 1500); // Wait a bit on success screen
      }, 2000);
  }

  const handleClose = () => {
      stopCamera();
      setStep(1);
      setSelfie(null);
      setError(null);
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border flex justify-between items-center">
          <h3 className="text-xl font-bold">Photo Verification</h3>
          <button onClick={handleClose} className="text-theme-text-secondary hover:text-theme-text-primary">&times;</button>
        </div>
        
        <div className="p-6 text-center">
            {step === 1 && (
                <div>
                    <p className="mb-4">To get verified, we need to compare your profile photo with a live selfie. Please grant camera access when prompted.</p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button onClick={startCamera} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg">Start Verification</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    {selfie ? (
                        <div>
                            <p>Here's your selfie. Does it look good?</p>
                            <img src={selfie} alt="Your selfie" className="w-64 h-64 object-cover mx-auto my-4 rounded-full"/>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => { setSelfie(null); startCamera(); }} className="bg-theme-border font-semibold py-2 px-4 rounded-lg">Retake</button>
                                <button onClick={handleVerify} className="bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg">Looks Good, Verify</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Center your face in the frame and take a selfie.</p>
                            <video ref={videoRef} autoPlay playsInline className="w-64 h-64 object-cover mx-auto my-4 rounded-full bg-theme-bg" />
                            <button onClick={takeSelfie} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 mx-auto"><CameraIcon className="w-5 h-5"/> Take Selfie</button>
                        </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
            {step === 3 && (
                <div>
                    <p className="text-lg font-semibold animate-pulse">Verifying...</p>
                    <p className="text-sm text-theme-text-secondary mt-2">Our AI is comparing your selfie with your profile photo.</p>
                </div>
            )}
            {step === 4 && (
                <div>
                    <p className="text-lg font-semibold text-green-500">Verification Successful!</p>
                    <p className="text-sm text-theme-text-secondary mt-2">Your profile is now Photo Verified.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
