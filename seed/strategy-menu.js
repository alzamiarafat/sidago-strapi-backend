export const strategyMenuItems = [
  {
    key: "capabilities",
    title: "Capabilities",
    href: "/strategy/capabilities",
    description: "Expertise and skills",
    iconKey: "capabilities",
    children: [
      {
        key: "b2b-solutions",
        title: "Case Study",
        href: "/strategy/b2b-solutions",
        description:
          "Research-led case studies that help businesses evaluate planning, efficiency, scalability, and overhead reduction.",
      },
      {
        key: "entire-plan",
        title: "Entire Plan",
        href: "/strategy/entire-plan",
        description:
          "A complete view of the strategy from assessment through execution.",
      },
      {
        key: "rapid-scaling",
        title: "Rapid Scaling",
        href: "/strategy/rapid-scaling",
        description:
          "Flexible support designed to help teams scale capacity quickly.",
      },
      {
        key: "reduced-employee-overhead",
        title: "Reduced Employee Overhead",
        href: "/strategy/reduced-employee-overhead",
        description:
          "Lower operating overhead through focused staffing and process support.",
      },
      {
        key: "time-savings",
        title: "Time Savings",
        href: "/strategy/time-savings",
        description:
          "Time saved by moving repeatable work into a clear delivery model.",
      },
    ],
  },
  {
    key: "employee-advantage",
    title: "Employee Advantage",
    href: "/strategy/employee-quality",
    description: "Benefits for employees",
    iconKey: "employeeAdvantage",
    children: [
      {
        key: "employee-quality",
        title: "Employee Quality",
        href: "/strategy/employee-quality",
        description:
          "A focus on matching skilled people with the right process and support.",
      },
      // {
      //   key: "established-management",
      //   title: "Established Management",
      //   href: "/strategy/established-management",
      //   description:
      //     "Experienced management practices that keep teams aligned and accountable.",
      // },
      {
        key: "hiring-model",
        title: "Hiring Model",
        href: "/strategy/hiring-model",
        description:
          "A structured hiring model for finding and retaining the right talent.",
      },
      {
        key: "operational-philosophy",
        title: "Operational Philosophy",
        href: "/strategy/operational-philosophy",
        description:
          "Our approach to managing and optimizing business operations.",
      },
      {
        key: "outsourceing-philosophy",
        title: "Outsourcing Philosophy",
        href: "/strategy/outsourceing-philosophy",
        description:
          "Our approach to managing and optimizing business operations.",
      },
      {
        key: "quality-assurance",
        title: "Quality Assurance",
        href: "/strategy/quality-assurance",
        description:
          "Our approach to managing and optimizing business operations.",
      },
      {
        key: "sidago-hiring",
        title: "Sidago Hiring",
        href: "/strategy/sidago-hiring",
        description:
          "Our approach to managing and optimizing business operations.",
      },
    ],
  },
  {
    key: "our-benefits",
    title: "Our Benefits",
    href: "/strategy/our-benefits",
    description: "Perks and value",
    iconKey: "benefits",
    children: [
      {
        key: "benefit-savings",
        title: "Benefit Savings",
        href: "/strategy/benefit-savings",
        description:
          "Savings opportunities created through better planning and execution.",
      },
      {
        key: "employee-reassignment",
        title: "Employee Reassignment",
        href: "/strategy/employee-reassignment",
        description:
          "Reassigning talent where it can create stronger business value.",
      },
      {
        key: "employee-specialization",
        title: "Employee Specialization",
        href: "/strategy/employee-specialization",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "external-team-entirely-managed",
        title: "External Team Entirely Managed",
        href: "/strategy/external-team-entirely-managed",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "major-cost-savings",
        title: "Major Cost Savings",
        href: "/strategy/major-cost-savings",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "managed-human-resources",
        title: "Managed Human Resources",
        href: "/strategy/managed-human-resources",
        description:
          "Structured support for people operations.",
      },
      {
        key: "management-savings",
        title: "Management Savings",
        href: "/strategy/management-savings",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "rapid-scalability-options",
        title: "Rapid Scalability Options",
        href: "/strategy/rapid-scalability-options",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "remain-competitive",
        title: "Remain Competitive",
        href: "/strategy/remain-competitive",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
      {
        key: "workflow-efficiency",
        title: "Workflow Efficiency",
        href: "/strategy/workflow-efficiency",
        description:
          "Focus on developing specialized skills and expertise in key areas.",
      },
    ],
  },
  {
    key: "our-process",
    title: "Our Processes",
    href: "/strategy/the-process",
    description: "Structured step approach",
    iconKey: "process",
    children: [
      {
        key: "initial-consultation",
        title: "Initial Consultation",
        href: "/strategy/initial-consultation",
        description:
          "The first conversation to understand the business need and success criteria.",
      },
      {
        key: "general-business-review",
        title: "General Business Review",
        href: "/strategy/general-business-review",
        description:
          "A review of current operations, constraints, and improvement opportunities.",
      },
      {
        key: "job-and-work-reviews",
        title: "Job & Work Reviews",
        href: "/strategy/job-and-work-reviews",
        description:
          "Role and workflow reviews that identify inefficiencies and improvement opportunities.",
      },
      {
        key: "employee-interviewing",
        title: "Employee Interviewing",
        href: "/strategy/employee-interviewing",
        description:
          "Structured employee interviews to surface bottlenecks, context, and process issues.",
      },
      {
        key: "estimated-cost-savings",
        title: "Estimated Cost Savings",
        href: "/strategy/estimated-cost-savings",
        description:
          "Projected savings based on the proposed operational and process improvements.",
      },
      {
        key: "propose-action-plan",
        title: "Propose Action Plan",
        href: "/strategy/propose-action-plan",
        description:
          "A clear action plan for priorities, ownership, and next steps.",
      },
      {
        key: "implementation",
        title: "Implementation",
        href: "/strategy/implementation",
        description:
          "Execution support to put the recommended changes into practice effectively.",
      },
    ],
  },
];

export function normalizeStrategyPath(pathname) {
  if (!pathname) {
    return "";
  }

  return pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
}

export function getActiveStrategyItem(pathname) {
  const currentPath = normalizeStrategyPath(pathname);

  return (
    strategyMenuItems.find((item) => {
      if (normalizeStrategyPath(item.href) === currentPath) {
        return true;
      }

      return item.children?.some(
        (child) => normalizeStrategyPath(child.href) === currentPath,
      );
    }) ?? null
  );
}

export function getStrategyChildMenuItems() {
  return strategyMenuItems.flatMap((item) => item.children ?? []);
}

export function getStrategySlugs() {
  return strategyMenuItems.flatMap((item) => [
    item.href.split("/").filter(Boolean).at(-1),
    ...(item.children ?? []).map((child) =>
      child.href.split("/").filter(Boolean).at(-1),
    ),
  ]);
}
