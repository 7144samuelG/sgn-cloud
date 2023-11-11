import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const PublishNewFile = () => {
  const router=useRouter()
  return (
    <div className="flex items-center h-full border">
    <Card className="w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Create a New File</CardTitle>
        <CardDescription>Enter the fail you want to upload</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="w-full grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="name of the file" />
            </div>
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file">Choose document</Label>
              <Input id="name" type="file" placeholder="Upload file" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Upload</Button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default PublishNewFile;
