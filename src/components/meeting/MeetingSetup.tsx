"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Button } from "../ui/button";
import Alert from "../root/Alert";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  const getBrowserInstructions = () => {
    const userAgent = navigator.userAgent;
    console.log("userAgent:", userAgent);

    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
      return `
        Chrome:
        1. Click on the lock icon in the address bar.
        2. Navigate to "Site Settings."
        3. Under "Permissions," find "Microphone" and set it to "Ask" or "Allow."
      `;
    }

    if (userAgent.includes("Firefox")) {
      return `
        Firefox:
        1. Click on the shield icon in the address bar.
        2. Navigate to "Permissions."
        3. Modify the "Microphone" permission to "Ask."
      `;
    }

    if (
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome") &&
      !userAgent.includes("Edg")
    ) {
      return `
        Safari:
        1. Go to Preferences > Websites > Microphone.
        2. Find your website and change the permission to "Ask" or "Allow."
      `;
    }

    if (userAgent.includes("Edg")) {
      return `
        Edge:
        1. Click on the lock icon in the address bar.
        2. Navigate to "Permissions for this site."
        3. Adjust the "Microphone" permission to "Ask" or "Allow."
      `;
    }

    return "Your browser is not recognized. Please consult your browser's documentation to reset microphone permissions.";
  };

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { hasBrowserPermission: hasBrowserCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasBrowserMicrophonePermission } =
    useMicrophoneState();

  const instruction = getBrowserInstructions();

  useEffect(() => {
    if (!hasBrowserCameraPermission) {
      alert(
        "You has denied or not granted camera permissions!\n" + instruction
      );
    }
    if (!hasBrowserMicrophonePermission) {
      alert(
        "You has denied or not granted microphone permissions!\n" + instruction
      );
    }
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [
    isMicCamToggled,
    call.camera,
    call.microphone,
    hasBrowserCameraPermission,
    hasBrowserMicrophonePermission,
    instruction,
  ]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>
        }
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
