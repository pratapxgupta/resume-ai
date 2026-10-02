export const mockInterviewReport = {
  title: "Backend Developer",
  matchScore: 88,
  technicalQuestions: [
    {
      questions: "How does the Node.js event loop handle asynchronous operations?",
      intention: "The interviewer wants to assess your understanding of Node.js internals and whether you can identify code that blocks the main thread.",
      answer: "Explain the call stack and event-loop phases, then distinguish microtasks such as resolved promises from timers and I/O callbacks. Mention that CPU-heavy work should be moved to worker threads or separate services.",
    },
    {
      questions: "How would you design a reliable message-processing system?",
      intention: "This tests your knowledge of distributed systems, delivery guarantees, failure recovery, and horizontal scaling.",
      answer: "Clarify throughput and ordering requirements. Cover producers, brokers, partitions, consumer groups, acknowledgements, idempotent consumers, retries, and dead-letter queues.",
    },
    {
      questions: "How do you diagnose and improve a slow MongoDB query?",
      intention: "The interviewer is evaluating your practical database optimization and debugging skills.",
      answer: "Inspect the query with explain('executionStats'), compare documents examined with documents returned, and add an index based on filtering and sorting patterns. Also discuss projection and pagination.",
    },
    {
      questions: "When would you introduce Redis into a backend architecture?",
      intention: "This checks whether you understand caching use cases as well as consistency and invalidation risks.",
      answer: "Discuss response caching, sessions, rate limiting, distributed locks, and pub/sub. Explain cache-aside behavior, TTL selection, invalidation, and how the system behaves when Redis is unavailable.",
    },
  ],
  behavioralQuestions: [
    {
      questions: "Tell me about a difficult production issue you resolved.",
      intention: "The interviewer wants evidence of ownership, calm problem solving, and effective communication under pressure.",
      answer: "Use the STAR method. Establish the impact, describe how you narrowed the cause, state the fix you personally implemented, and finish with a measurable result and prevention steps.",
    },
    {
      questions: "Describe a time you disagreed with a teammate's technical approach.",
      intention: "This assesses collaboration, empathy, and your ability to make decisions using evidence rather than ego.",
      answer: "Explain both viewpoints fairly, show how you aligned on shared requirements, and describe any prototype, benchmark, or discussion used to decide.",
    },
    {
      questions: "Tell me about a project that did not go according to plan.",
      intention: "The interviewer is looking for adaptability, accountability, and an ability to learn from setbacks.",
      answer: "Choose an example with a genuine obstacle. Explain how you communicated the risk, reprioritized the work, and improved the outcome. Conclude with what you learned.",
    },
  ],
  skillGaps: [
    { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker and CI/CD Pipelines", severity: "high" },
    { skill: "Distributed Systems Design", severity: "medium" },
    { skill: "Production-level Redis Management", severity: "low" },
  ],
  preparationPlan: [
    { day: 1, focus: "Node.js Internals and Streams", tasks: ["Deep dive into the event-loop phases and process.nextTick versus setImmediate.", "Implement streams for processing a large file without loading it fully into memory."] },
    { day: 2, focus: "Advanced MongoDB and Indexing", tasks: ["Study compound, TTL, multikey, and text indexes.", "Practice aggregation pipelines and inspect performance with explain('executionStats')."] },
    { day: 3, focus: "Caching and Redis Strategies", tasks: ["Review Redis sets, hashes, sorted sets, eviction policies, and persistence.", "Build a Redis-backed rate limiter and document its failure behavior."] },
    { day: 4, focus: "System Design and Microservices", tasks: ["Compare synchronous and asynchronous communication between services.", "Design an API gateway flow with timeouts, retries, and circuit breakers."] },
    { day: 5, focus: "Message Queues and DevOps Basics", tasks: ["Review Kafka or RabbitMQ concepts, delivery guarantees, and dead-letter queues.", "Dockerize a sample API and create a basic continuous-integration workflow."] },
  ],
};
