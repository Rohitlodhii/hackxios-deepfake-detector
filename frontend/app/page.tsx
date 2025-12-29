"use client";

import { useState } from "react";
import GalleryUpload from "@/components/gallery-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FileWithPreview } from "@/hooks/use-file-upload";
import Navbar from "@/components/Navbar";

type PredictionResult = {
  fake_probability: number;
  real_probability: number;
  label: string;
  disclaimer?: string;
};

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (nextFiles: FileWithPreview[]) => {
    setFiles(nextFiles);
    if (nextFiles.length === 0) {
      setResult(null);
      setError(null);
    }
  };

  const analyze = async () => {
    if (files.length === 0) return;

    // Analyze the first file
    const fileToAnalyze = files[0].file;
    if (!(fileToAnalyze instanceof File)) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", fileToAnalyze);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as PredictionResult;
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-2 relative max-w-4xl mx-auto w-full min-h-screen px-2 md:px-0">
      <Navbar />

      <div className="flex flex-col gap-4 pt-16 items-center justify-center pb-6">
        <Card className="w-full max-w-4xl">
          <CardContent className="flex flex-col items-center gap-6">
            <GalleryUpload
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              accept="image/*"
              multiple={false}
              onFilesChange={handleFilesChange}
            />

            {files.length > 0 && (
              <Button onClick={analyze} disabled={loading} className="px-8 py-2">
                {loading ? "Detecting..." : "Detect"}
              </Button>
            )}

            {error && (
              <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                {error}
              </div>
            )}

            {result && (
              <div className="w-full rounded-lg border p-4 text-center space-y-2">
                <p className="font-semibold">Fake Probability: {result.fake_probability}</p>
                <p className="font-semibold">Real Probability: {result.real_probability}</p>
                <p className="font-semibold">Label: {result.label}</p>
                {result.disclaimer && (
                  <p className="text-sm text-muted-foreground">{result.disclaimer}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full max-w-4xl">
          <CardContent className="space-y-4 p-4 text-sm text-muted-foreground">
            <p>
              The model is trained on a specific distribution of GAN-generated faces. While it performs strongly on
              known deepfake patterns, its confidence drops on unseen generators, which reflects the real-world
              challenge of generalization in deepfake detection.{" "}
              <a
                href="https://www.cvisionlab.com/cases/deepfake-gan/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Learn more about GAN-based deepfakes
              </a>
              .
            </p>
            <p>
              This tool provides a probabilistic assessment based on visual patterns learned from known examples of
              manipulated and AI-generated images. While it can identify common deepfake artifacts, it may not reliably
              detect all types of manipulated content—especially images generated using unseen or highly advanced
              techniques. Results should be interpreted with caution and are intended to support human judgment, not
              replace it.
            </p>

            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-left">Fake image examples</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/fakeimages/fakeimage1.jpg"
                    alt="Example fake face 1"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/fakeimages/fakeimage2.jpg"
                    alt="Example fake face 2"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/fakeimages/fakeimage3.jpg"
                    alt="Example fake face 3"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/fakeimages/fakeimage4.jpg"
                    alt="Example fake face 4"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/fakeimages/fakeimage5.jpg"
                    alt="Example fake face 5"
                    className="h-40 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
