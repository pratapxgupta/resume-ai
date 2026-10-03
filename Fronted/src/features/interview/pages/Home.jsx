import {
  ArrowRight,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Sparkles,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { useInterview } from "../hooks/useInterview";

const textareaClass =
  "min-h-40 w-full resize-y rounded-lg border border-input bg-background px-3 py-3 text-sm leading-6 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

export default function Home() {
  const { loading, generateReport } = useInterview();
  const navigate = useNavigate();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");
  const resumeInputRef = useRef(null);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const resume = resumeInputRef.current?.files?.[0];
    if (!resume) {
      setError("Choose a PDF resume before generating your plan.");
      return;
    }
    if (resume.size > 3 * 1024 * 1024) {
      setError("Your resume must be 3 MB or smaller.");
      return;
    }
    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resume,
      });
      navigate(`/interview/${data._id}`);
    } catch (requestError) {
      setError(
        typeof requestError === "string"
          ? requestError
          : "Could not generate the interview plan. Please try again.",
      );
    }
  };

  return (
    <DashboardLayout>
      <main>
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4 text-primary" />
              Personalized interview workspace
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Build a plan around the role you actually want.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Add the job description, your resume, and the context that
              matters. InterviewAI will turn them into focused preparation.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <form onSubmit={submit}>
            <div className="grid gap-6 lg:grid-cols-2">
              <FormCard
                number="01"
                icon={FileText}
                title="Job description"
                description="Paste the complete role you are preparing for."
              >
                <Label htmlFor="jobDescription" className="sr-only">
                  Job description
                </Label>
                <textarea
                  className={textareaClass}
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste responsibilities, requirements, and role details..."
                  required
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  More detail helps make the questions and recommendations
                  specific.
                </p>
              </FormCard>
              <div className="grid gap-6">
                <FormCard
                  number="02"
                  icon={UploadCloud}
                  title="Your resume"
                  description="Upload your latest resume as a PDF."
                >
                  <Label
                    htmlFor="resume"
                    className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-5 text-center transition-colors hover:border-primary hover:bg-accent/50"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                      <UploadCloud className="size-5" />
                    </span>
                    <strong className="mt-3 text-sm">
                      {resumeName || "Choose your resume"}
                    </strong>
                    <span className="mt-1 text-xs text-muted-foreground">
                      PDF, up to 3 MB
                    </span>
                    <input
                      ref={resumeInputRef}
                      id="resume"
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      required
                      onChange={(event) =>
                        setResumeName(event.target.files?.[0]?.name || "")
                      }
                    />
                  </Label>
                </FormCard>
                <FormCard
                  number="03"
                  icon={UserRound}
                  title="About you"
                  description="Add goals or context not captured by your resume."
                >
                  <Label htmlFor="selfDescription" className="sr-only">
                    About you
                  </Label>
                  <textarea
                    className={`${textareaClass} min-h-32`}
                    id="selfDescription"
                    value={selfDescription}
                    maxLength={500}
                    onChange={(event) => setSelfDescription(event.target.value)}
                    placeholder="Share your goals, strengths, and areas you want to improve..."
                    required
                  />
                  <p className="mt-2 text-right text-xs text-muted-foreground">
                    {selfDescription.length}/500
                  </p>
                </FormCard>
              </div>
            </div>
            {error && (
              <div
                className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <LockKeyhole className="size-4" />
                Your information is used to create this report.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {loading ? "Generating your plan..." : "Generate my plan"}
                {!loading && <ArrowRight className="size-4" />}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </DashboardLayout>
  );
}

function FormCard({ number, icon: Icon, title, description, children }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-wider text-primary">
            STEP {number}
          </p>
          <CardTitle className="mt-1 text-xl">{title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
