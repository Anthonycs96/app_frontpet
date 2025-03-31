import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function CitasPage() {
  return (
    <div className="relative w-full">
      <h1 className="sticky top-0 left-0 right-0 z-10 text-2xl font-bold mb-4 px-4 py-2 bg-[var(--background)] shadow-none">
        Gestión de Citas
      </h1>

      <div className="relative w-full">
        <Card className="w-full max-w-full">
          <CardHeader>
            <h2 className="text-lg font-semibold">Información sobre Citas</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
