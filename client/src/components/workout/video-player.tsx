import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  duration?: string;
  thumbnail?: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ 
  videoUrl, 
  title, 
  duration, 
  thumbnail,
  onComplete 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      const newTime = (value / 100) * totalDuration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const handleVideoEnd = () => {
    setIsPlaying(false);
    onComplete?.();
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className="relative bg-black group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster={thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta reprodução de vídeo.
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <Button 
              size="lg"
              variant="ghost"
              className="bg-primary hover:bg-red-600 text-white rounded-full w-16 h-16"
              onClick={togglePlay}
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        )}

        {/* Controls Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <Progress 
                value={progress} 
                className="h-1 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  handleSeek(percentage);
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white hover:text-primary" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:text-primary" onClick={restart}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:text-primary" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:text-primary" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
                <Button size="sm" variant="ghost" className="text-white hover:text-primary" onClick={toggleFullscreen}>
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            {duration && (
              <p className="text-gray-600 text-sm">Duração: {duration}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Favoritar
            </Button>
            <Button size="sm" variant="outline">
              Compartilhar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
