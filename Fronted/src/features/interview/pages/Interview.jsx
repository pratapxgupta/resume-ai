import {
  AlertCircle,
  ArrowLeft,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  MessageSquareText,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { ReportSkeleton } from "../../../components/PageSkeleton";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { useInterview } from "../hooks/useInterview";

const sections = [
  { id: "roadmap", label: "Roadmap", icon: CalendarDays },
  { id: "technical", label: "Technical", icon: BrainCircuit },
  { id: "behavioral", label: "Behavioral", icon: MessageSquareText },
];

export default function Interview() {
  const [activeSection, setActiveSection] = useState("roadmap");
  const [error, setError] = useState("");
  const { interviewId } = useParams();
  const { loading, report, getReportById } = useInterview();
  useEffect(() => {
    getReportById(interviewId).catch((requestError) =>
      setError(
        typeof requestError === "string"
          ? requestError
          : "Could not load this interview report.",
      ),
    );
  }, [getReportById, interviewId]);

  if (loading && !report) return <ReportSkeleton />;
  if (error || !report)
    return (
      <StatusPage
        icon={AlertCircle}
        title="Report unavailable"
        copy={error || "This interview report could not be found."}
      />
    );

  const isRoadmap = activeSection === "roadmap";
  const questions =
    activeSection === "technical"
      ? report.technicalQuestions
      : report.behavioralQuestions;
  const count = isRoadmap
    ? `${report.preparationPlan.length}-day plan`
    : `${questions.length} questions`;

  return (
    <DashboardLayout>
      <main>
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Button variant="ghost" size="sm" asChild className="-ml-3 mb-5">
              <Link to="/app">
                <ArrowLeft className="size-4" />
                Create another plan
              </Link>
            </Button>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Interview preparation report
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {report.title}
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Your focused questions, priorities, and preparation roadmap.
                </p>
              </div>
              <Score score={report.matchScore} />
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="min-w-0">
            <div
              className="mb-7 flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-1.5"
              role="tablist"
              aria-label="Report sections"
            >
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeSection === id}
                  onClick={() => setActiveSection(id)}
                  className={cn(
                    "inline-flex min-w-max flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground",
                    activeSection === id &&
                      "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                {
                  sections.find((section) => section.id === activeSection)
                    ?.label
                }{" "}
                {isRoadmap ? "preparation" : "questions"}
              </h2>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {count}
              </span>
            </div>
            {isRoadmap ? (
              <Roadmap items={report.preparationPlan} />
            ) : (
              <Questions items={questions} />
            )}
          </section>
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Target className="size-5" />
                  <CardTitle>Skill priorities</CardTitle>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Areas to strengthen for this role.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {report.skillGaps.map((gap) => (
                  <div
                    key={gap.skill}
                    className="rounded-lg border border-border bg-muted/40 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-medium">{gap.skill}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          gap.severity === "high" &&
                            "bg-destructive/10 text-destructive",
                          gap.severity === "medium" &&
                            "bg-primary/10 text-primary",
                          gap.severity === "low" &&
                            "bg-accent text-accent-foreground",
                        )}
                      >
                        {gap.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <CheckCircle2 className="size-7" />
                <h3 className="mt-4 text-lg font-semibold">
                  Work the plan in order
                </h3>
                <p className="mt-2 text-sm leading-6 opacity-80">
                  Use the roadmap to structure your preparation, then practice
                  the tailored questions.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </DashboardLayout>
  );
}

function Score({ score }) {
  return (
    <Card className="w-full md:w-auto">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className="grid size-16 place-items-center rounded-full bg-[conic-gradient(var(--primary)_0_var(--score),var(--border)_var(--score))]"
          style={{ "--score": `${score * 3.6}deg` }}
        >
          <div className="grid size-12 place-items-center rounded-full bg-card text-sm font-bold">
            {score}%
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Match score
          </p>
          <p className="mt-1 font-semibold">Role alignment</p>
        </div>
      </CardContent>
    </Card>
  );
}
function Roadmap({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.day}>
          <CardContent className="flex gap-4 p-5 sm:gap-6 sm:p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
              {item.day}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Day {item.day}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{item.focus}</h3>
              <ul className="mt-4 space-y-3">
                {item.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
function Questions({ items }) {
  return (
    <div className="space-y-5">
      {items.map((question, index) => (
        <Card key={`${question.questions}-${index}`}>
          <CardHeader className="flex flex-row gap-4">
            <span className="text-sm font-bold text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <CardTitle className="text-lg leading-7">
              {question.questions}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Why they ask
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {question.intention}
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                How to answer
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {question.answer}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
function StatusPage({ icon: Icon, title, copy }) {
  return (
    <DashboardLayout>
      <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-4">
        <div className="max-w-md text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
            <Icon className="size-6" />
          </span>
          <h1 className="mt-5 text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{copy}</p>
          <Button className="mt-6" asChild>
            <Link to="/app">Back to workspace</Link>
          </Button>
        </div>
      </main>
    </DashboardLayout>
  );
}
