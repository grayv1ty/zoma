import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface PermissionCardProps {
  title: string;
  icon?: ReactNode;
}

const Alert = ({ title, icon }: PermissionCardProps) => {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {icon && (
                <div className="flex items-center justify-center">{icon}</div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-blue-500">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
