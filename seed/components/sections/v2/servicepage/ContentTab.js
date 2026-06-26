"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getServiceMenuContext } from "@/src/utils/serviceUtils";
import {
  getIndustryMenuContext,
  getIndustryMenuContextFromGroups,
  getIndustryMenuGroups,
  getMenuContextFromGroups,
  getServiceMenuContextFromGroups,
  getServicesMenuGroups,
  normalizeMenuGroups,
  normalizePath,
} from "@/src/utils/navigationTabUtils";
import {
  getActiveStrategyItem,
  normalizeStrategyPath,
  strategyMenuItems,
} from "@/src/data/strategy-menu";

function getItemId(prefix, value, suffix) {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${suffix}`;
}

function findMenuItemByHref(items, href) {
  for (const item of items ?? []) {
    if (item.href === href) {
      return item;
    }

    const nested = findMenuItemByHref(item.children, href);

    if (nested) {
      return nested;
    }
  }

  return null;
}

function findMenuItemByPath(items, path) {
  for (const item of items ?? []) {
    if (normalizePath(item.href) === path) {
      return item;
    }

    const nested = findMenuItemByPath(item.children, path);

    if (nested) {
      return nested;
    }
  }

  return null;
}

function findMenuHrefForPath(pathname, groups = []) {
  const path = normalizePath(pathname);

  for (const group of groups) {
    if (normalizePath(group.href) === path) {
      return group.href;
    }

    const child = findMenuItemByPath(group.children, path);

    if (child) {
      return child.href;
    }
  }

  return null;
}

function menuTreeHasActiveHref(items, href) {
  for (const item of items ?? []) {
    if (item.href === href) {
      return true;
    }

    if (menuTreeHasActiveHref(item.children, href)) {
      return true;
    }
  }

  return false;
}

function findNestedServiceParentHref(children, pathHref) {
  for (const item of children ?? []) {
    const subs = item.children ?? [];

    if (!subs.length) {
      continue;
    }

    if (item.href === pathHref || subs.some((s) => s.href === pathHref)) {
      return item.href;
    }
  }

  return "";
}

function getServiceIntroContent(groupTitle = "") {
  const introByGroup = {
    "Development & IT": {
      introTitle: "Digital products built for scale and speed",
      introDescription:
        "From engineering delivery to technical execution, we support modern teams with dependable development services tailored to product growth, performance, and long-term scalability.",
    },
    "Administrative Support": {
      introTitle: "Operational support that keeps work moving",
      introDescription:
        "We help teams stay focused by streamlining daily operations through reliable administrative support, structured workflows, and efficient task execution across business functions.",
    },
    "Advertising & Marketing": {
      introTitle: "Growth-focused marketing support for modern brands",
      introDescription:
        "From audience reach to campaign execution, our marketing services help businesses improve visibility, generate demand, and build stronger customer engagement across channels.",
    },
    "Design & Multimedia": {
      introTitle: "Creative services that elevate every brand touchpoint",
      introDescription:
        "We deliver design and multimedia solutions that strengthen visual identity, improve communication, and create polished digital experiences across platforms and campaigns.",
    },
    "Business Services": {
      introTitle: "Business support designed for efficient execution",
      introDescription:
        "Our business services help organizations operate with more clarity and consistency through structured support across planning, analysis, customer operations, and back-office delivery.",
    },
  };

  return (
    introByGroup[groupTitle] ?? {
      introTitle: "Specialized services designed for execution",
      introDescription:
        "We provide practical service support across business-critical functions, helping teams improve delivery quality, operational consistency, and day-to-day execution.",
    }
  );
}

function getServiceDetailContent(href = "") {
  const contentMap = {
    "/services/application-interface-design/": {
      eyebrow: "Development & IT",
      title: "Application Interface Design",
      summary:
        "Interfaces that feel intuitive from the first interaction and stay consistent as products grow.",
      paragraphs: [
        "A strong interface design strategy keeps attention on customer satisfaction, usability, and long-term trust instead of relying only on feature volume. The clearer the interface, the easier it is for users to adopt the product and continue using it with confidence.",
        "For software products, business systems, and commercial applications, interface design directly shapes how people experience the product. Clean structure, visual clarity, and thoughtful interaction patterns reduce friction and help users complete tasks without wasting time on a steep learning curve.",
        "Application interface design is closely connected to software development, so it should never be treated as decoration after the fact. It influences product quality, customer perception, and overall adoption just as much as technical capability.",
        "Our approach focuses on interfaces that are adaptable, maintainable, and aligned with business requirements. That means future changes can be introduced without breaking design consistency or forcing costly redesign work later.",
      ],
    },
    "/services/desktop-applications/": {
      eyebrow: "Development & IT",
      title: "Desktop Applications",
      summary:
        "Desktop software built for security, deeper functionality, and dependable day-to-day business use.",
      paragraphs: [
        "While internet-based software is now common across most organizations, many businesses still rely on stand-alone desktop applications because they can support more advanced features and reduce exposure to risks that come with fully internet-dependent systems.",
        "For teams handling sensitive operational data, desktop applications remain a practical choice. Limiting unnecessary internet exposure helps reduce security concerns, while secure storage and synchronization options still allow desktop tools to integrate smoothly with broader online workflows.",
        "A well-designed desktop application can improve productivity by giving teams a focused environment built around the way they actually work. In many cases, that means stronger performance, more control over functionality, and fewer limitations than purely browser-based software.",
        "Our desktop application solutions are shaped around business-specific requirements. We support secure architecture, maintainability, collaboration features, client-server workflows, and user-friendly design so the final product feels reliable, efficient, and easy to use over time.",
      ],
    },
    "/services/e-commerce/": {
      eyebrow: "Development & IT",
      title: "E-Commerce",
      summary:
        "Commerce platforms designed for secure transactions, better customer experience, and long-term digital growth.",
      paragraphs: [
        "Online business continues to create major opportunities for companies of every size. As e-commerce grows and technology becomes more accessible, businesses can build modern storefronts with significantly lower overhead than traditional retail operations.",
        "Once a domain and brand foundation are in place, the next priority is creating the right e-commerce environment. That includes a secure payment system, a dependable storefront, and a user experience that makes shopping simple, fast, and trustworthy for customers.",
        "Security is one of the most important parts of any e-commerce operation. Customer information, payment flow, and account access all need to be protected through reliable systems and disciplined processes. That is why we focus on secure commerce architecture and stable implementation from the beginning.",
        "Whether the goal is to improve an existing store or launch a fully custom e-commerce platform, we help businesses build digital commerce systems that are scalable, secure, and aligned with real operational needs. The result is a platform that supports both performance and long-term growth.",
      ],
    },
    "/services/game-development/": {
      eyebrow: "Development & IT",
      title: "Game Development",
      summary:
        "Game experiences developed for engagement, platform flexibility, and production quality from concept through release.",
      paragraphs: [
        "Game development has grown rapidly into a large-scale and highly competitive industry, with products designed for a wide range of age groups and player expectations. That growth makes strategy, execution, and audience fit critical from the earliest stages of development.",
        "Successful game development requires more than just visual polish. Content direction, gameplay structure, testing, and market positioning all influence how a game is received. We approach game development as a full lifecycle process, from concept and production through testing and launch preparation.",
        "Our team can build games for multiple platforms or for specific target environments, depending on product requirements. That includes adapting gameplay systems, improving visual quality, refining user experience, and strengthening overall performance to match business and audience goals.",
        "Whether you need support for a full game build or help in a specific stage of development, we can step in with practical development capability. From graphics and animation to usability and platform delivery, we focus on creating polished game experiences that are both technically sound and commercially viable.",
      ],
    },
    "/services/mobile-apps/": {
      eyebrow: "Development & IT",
      title: "Mobile Apps",
      summary:
        "Mobile application solutions designed to expand customer reach, strengthen communication, and support business growth across modern devices.",
      paragraphs: [
        "A successful business depends not only on the services and products it offers, but also on how effectively it connects with its target audience. As smartphone technology continues to evolve, mobile experiences have become one of the most direct and practical ways to build stronger customer interaction.",
        "Mobile applications create a reliable channel for access, engagement, and communication with customers. As smartphone adoption continues to grow, a dedicated mobile app can help a business promote itself more effectively while also opening new opportunities for service delivery and revenue generation.",
        "We approach mobile app development as a business tool, not just a technical product. Depending on your goals, market position, and customer needs, we develop native mobile applications that provide a smooth experience across major operating systems including iOS and Android.",
        "Our focus is on quality, usability, and fit for purpose. With experienced developers and flexible delivery support, we build mobile applications that help businesses stay accessible, modern, and better aligned with how customers interact today.",
      ],
    },
    "/services/plugin-development/": {
      eyebrow: "Development & IT",
      title: "Software Plugins",
      summary:
        "Plugin development that extends existing software capabilities without forcing expensive full-system redesigns.",
      paragraphs: [
        "Business objectives and operational requirements change over time. As organizations grow, systems often need to support new strategies, services, clients, and workflows. That means software environments must stay current as technology evolves across both software and hardware.",
        "In many cases, the right answer is not rebuilding an entire platform. When business requirements shift, a well-designed plugin can add the needed capability quickly, whether that means supporting additional file formats, introducing new integrations, or extending existing workflow functionality.",
        "Because technology changes rapidly, businesses need software that can adapt without creating unnecessary disruption. Plugin development offers a practical way to enhance the tools you already rely on while preserving the value of your existing software investment.",
        "Our approach starts with understanding your business strategy, operational goals, and the specific software environment in use. From there, we identify the most appropriate enhancements and build plugins that strengthen functionality, improve efficiency, and align better with your long-term needs.",
      ],
    },
    "/services/scripts-and-utilities/": {
      eyebrow: "Development & IT",
      title: "Scripts and Utilities",
      summary:
        "Custom scripts and utility software built to reduce repetitive work, improve accuracy, and streamline business operations.",
      paragraphs: [
        "Administrative and operational work often depends on repeated manual tasks, especially in larger businesses handling data entry, bulk transaction processing, and other routine workflows. When too much of that work stays manual, inefficiency, human error, and delivery delays become much more likely.",
        "Scripts and utilities help solve those problems by automating focused tasks with speed and consistency. From simple browser-supported actions to process automation across internal systems, these tools reduce repetitive effort and make execution more dependable.",
        "We build scripts and utility software as part of broader business IT enablement. The goal is to improve administration, reduce operational friction, and strengthen output quality by removing avoidable manual mistakes from common workflows.",
        "Depending on your business requirements and the systems already in use, we create customized scripts and utility solutions that produce the exact output you need. The result is better efficiency, improved reliability, and stronger customer satisfaction through smoother business execution.",
      ],
    },
    "/services/project-management/": {
      eyebrow: "Development & IT",
      title: "Software Project Management",
      summary:
        "Delivery oversight that keeps software and IT initiatives aligned with scope, resources, and timelines—so leadership can see progress, cost, and risk in one clear picture.",
      paragraphs: [
        "Resource management is central to running a successful business, especially when programs span multiple teams, vendors, and budgets. Without a disciplined view of work in flight against available capacity and spend, organizations can over-commit, duplicate effort, or miss early warning signs that a project is drifting away from plan.",
        "For IT-led organizations, software project management is the practical mechanism to track progress through each phase, compare delivery against the baseline plan, and manage expenses and deadlines with fewer surprises. The focus is on visibility and control: what is done, what is next, what is blocked, and what decisions are required to keep momentum.",
        "Sidago provides outsourcing and business consulting support for teams that need experienced oversight across larger or higher-risk initiatives. We help structure governance, communication, and reporting so stakeholders stay aligned, milestones remain credible, and delivery goals are pursued with realistic expectations.",
        "By tracking project stages, tightening documentation and status rhythms, and supporting transparent commercial practices—including clear, detailed invoicing where appropriate—we aim to improve trust and satisfaction on both sides of the engagement.",
      ],
      closing: "Get in touch with us today.",
      closingHref: "/contact",
    },
    "/services/software-qa/": {
      eyebrow: "Development & IT",
      title: "Software Quality Assurance (QA)",
      summary:
        "Structured testing and quality practices that reduce release risk, catch defects early, and help business software perform reliably as systems grow or change.",
      paragraphs: [
        "Quality assurance is essential before implementation and whenever you make structural changes to business software. Thoughtful QA reduces the chance that issues reach production, protects customer experience, and helps teams validate that performance, security, and workflows behave as intended under real operating conditions.",
        "Testing can—and should—begin before new systems go live or before major upgrades roll out. Finding and correcting errors earlier avoids costly rework, reduces operational disruption, and keeps delivery aligned with business goals instead of firefighting after release.",
        "While many QA approaches stop at checking boxes against a standard checklist, Sidago Integrated Solutions takes a broader view of quality as a business outcome—not only whether something passes a test, but whether the product is fit for purpose, maintainable, and safe to operate at scale.",
        "Our work typically includes producing a detailed analysis of risk areas, making prioritized recommendations, proposing practical remediation paths, and supporting adoption with hands-on guidance—including real-time training where teams need to build confidence with new processes or tools.",
        "Together, these steps form a complete package of professional consultation and practical improvement so quality becomes part of how you deliver—not an afterthought bolted on at the end.",
      ],
      closing: "Contact us today!",
      closingHref: "/contact",
    },
    "/services/administrative-services/": {
      eyebrow: "Administrative Support",
      title: "Administrative Services",
      summary:
        "Outsourced administration that lifts routine operational load—so owners and teams can focus on core strengths while standards, coordination, and day-to-day execution stay dependable.",
      paragraphs: [
        "When a business is established on a small scale, the most common factor behind its establishment is the passion and interest of the business owner in that particular field. This may not be the case with large organizations, but any small-scale business passes through this phase before expanding into a much larger company. However, the digital landscape and the complications of online marketing have made it difficult to run a business without good experience or in-depth knowledge. That is why a small-scale business owner may find it difficult to carry out administrative tasks. In such situations, outsourcing the admin department to another organization can solve the problem easily. Not only can it increase the efficiency of the business, but it can also ease the burden of the owner and allow him or her to focus on core competencies. Outsourcing administrative services can also help a large organization reduce costs and increase efficiency overall.",
        "Keeping in view the concept above, we are here to help you with administration problems regardless of the nature and scale of your business. For many companies, the most common problems causing hindrance to progress are associated with administration. As an outsourcing and business consultation firm, Sidago Integrated Solutions can help you by looking after your administration department. We understand that this department is crucial for maintaining standards and coordinating the rest of the departments well. With years of experience and in-depth knowledge of modern business techniques, we work toward a smoothly running business. We believe in planning for unexpected situations and upcoming events ahead of time. By predicting future changes in market trends and evaluating current problems in your organization's structure, we look forward to meeting future challenges and moving toward improvement. With this administration approach, we are proactive in our services.",
        "Beyond general administrative services, notable areas we cover include email management, transcription, web research, data entry, and personal assistant support. By availing our services, you can be confident that you will achieve high customer satisfaction and a strong reputation. You neither need to spend hours of frustration organizing files and paperwork, nor supervise a large administration department alone. Our experienced and highly qualified team is here to help ensure your business meets its objectives linked with administration. Meanwhile, you can focus on other aspects of your business and work toward the highest place in this competitive business environment.",
      ],
      closing: "Get in touch with us today.",
      closingHref: "/contact",
    },
    "/services/data-entry/": {
      eyebrow: "Administrative Support",
      title: "Data Entry",
      summary:
        "Accurate, confidential clerical data entry and capture—handled by experienced operators with verification discipline, manual-first quality, and the tooling needed for consistent digital formats.",
      paragraphs: [
        "Regardless of the technical changes and advancements we make in terms of business, there are always some tasks that need human operators to make sure that everything is done accurately. Such jobs are usually categorized as clerical jobs. Data entry belongs to the same category. As a clerical job, it does not require advanced technical skills or high qualifications. Good experience, relevant personality traits, and physical stamina are often enough to handle data entry work well. However, because data entry may involve confidential information about the company, it is very important that an experienced human operator looks after it. That helps ensure accuracy while maintaining privacy of data. For privacy reasons—and sometimes cost—many companies prefer to outsource these tasks to third parties.",
        "Sidago Integrated Solutions is determined to help businesses establish and prosper. We therefore offer data entry services as part of our administrative support. With our carefully planned approach, we aim for a high level of accuracy in delivery. We prefer manual data entry where it makes it possible to apply verification techniques with more rigor. Our swift and experienced typists are ready to meet realistic deadlines you assign for projects of many kinds. When data entry involves capturing and transferring information into a digital format for computer use, we maintain the equipment needed to keep formats consistent. Along with accuracy, we also work to keep your data confidential and will not disclose it to anyone without your permission. In short, you can rely on disciplined data entry support at competitive rates.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/email-response-handling/": {
      eyebrow: "Administrative Support",
      title: "Email Response Handling",
      summary:
        "Reliable, secure email handling for growing teams—so responses stay timely, professional, and consistent without letting inboxes become a bottleneck for reputation or customer trust.",
      paragraphs: [
        "As businesses grow, administrative work expands quickly—and email is often one of the first places where delays show up. When responses slow down, messages pile up, or follow-through becomes inconsistent, the impact is not only internal stress. Customers and partners can lose confidence, and even a strong brand can take reputational damage when communication feels unresponsive or disorganized.",
        "Sidago’s email management approach is built to give you a more personalized, secure, and efficient way to handle day-to-day correspondence. We focus on clear ownership of inboxes, disciplined response patterns, and careful handling of sensitive information so your team saves time while maintaining confidentiality and a professional tone in every thread.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/personal-assistant/": {
      eyebrow: "Administrative Support",
      title: "Personal Assistant",
      summary:
        "Flexible executive and administrative support—scheduling, records, travel, and day-to-day coordination—delivered through plans that match how you work, virtually or on-site.",
      paragraphs: [
        "One of the biggest challenges businesspeople face is juggling responsibilities at work with demands in their personal lives. If you are supervising a large team, schedule clashes are common—and they can affect your reputation as a leader. A practical way to reduce friction is hiring a personal assistant to help with administrative and management tasks. These tasks include, but are not limited to, scheduling meetings, keeping financial records, booking accommodations, and making other necessary travel arrangements.",
        "As an outsourcing firm, we understand the common problems many business owners face that can slow progress. With Sidago’s personal assistant service, you can reduce the risk of missed meetings or appointments. We offer fully customized plans and packages so you can choose what fits your project needs and working style.",
        "Those customized packages also make it possible to receive support only during the hours you need, which helps avoid unnecessary charges. We offer both virtual and on-site personal assistants who are dedicated to serving you in different situations. Our assistants bring strong communication skills and relevant experience so they can meet your requirements with professionalism and care.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/transcription/": {
      eyebrow: "Administrative Support",
      title: "Transcription",
      summary:
        "Accurate, confidential transcription for business, legal, and medical-style workflows—turning audio and spoken content into clean text you can search, publish, and archive with confidence.",
      paragraphs: [
        "Transcription remains essential for many businesses that need reliable records of conversations, interviews, meetings, and specialized proceedings. Beyond day-to-day operations, high-quality transcripts can support compliance, training, knowledge retention, and even discoverability when content is repurposed for the web. Fields such as legal proceedings and medical documentation have long depended on disciplined transcription practices to preserve detail and reduce ambiguity.",
        "Sidago Integrated Solutions provides transcription support as part of our administrative services portfolio. We focus on clear turnaround expectations, careful listening, and consistent formatting so you receive transcripts you can trust. Our approach emphasizes accuracy and confidentiality, with pricing structured to stay practical for ongoing business use.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/web-research/": {
      eyebrow: "Administrative Support",
      title: "Web Research",
      summary:
        "Structured online research and marketplace intelligence—so decisions are backed by current, relevant data instead of guesswork or incomplete snapshots.",
      paragraphs: [
        "For business owners and operators, the web is both an opportunity and a noise problem. Useful decisions depend on relevant, well-sourced information: competitor positioning, pricing signals, customer sentiment, regulatory updates, and the many small facts that change week to week. Without disciplined research habits, teams can spend hours online and still walk away with conclusions that are incomplete, outdated, or hard to defend internally.",
        "Sidago Integrated Solutions helps organizations turn vague questions into clearer evidence. We support detailed marketplace scanning, structured note-taking, and practical data-gathering approaches—including survey-style collection where it fits—so you receive organized findings you can act on. The goal is faster clarity, fewer blind spots, and research output that is easier to share with stakeholders.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/what-we-write/": {
      eyebrow: "Administrative Support",
      title: "What We Write",
      summary:
        "Professional writing support—from persuasive copy to long-form creative work and web-ready content—delivered with consistent tone, structure, and editorial quality.",
      paragraphs: [
        "Clear writing is one of the fastest ways to improve how a business is understood. Whether the goal is to convert readers, explain a complex offer, or build trust over time, the words on the page need to match the quality of the product or service behind them.",
        "Under What We Write, Sidago supports copywriting, creative writing, and web content writing as focused service tracks. That structure makes it easier to match the right writer, review cadence, and format to the channel you are publishing in—without forcing a one-size-fits-all approach.",
        "If you are unsure which track fits best, starting from this overview page is a practical way to compare options and decide what to prioritize first.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/copywriting/": {
      eyebrow: "Administrative Support",
      title: "Copywriting",
      summary:
        "Effective copywriting promotes your business by presenting ideas in a clear, persuasive way that builds trust, supports action, and strengthens the return on your marketing effort.",
      paragraphs: [
        "Copywriting is a tried-and-true method of promoting any type of business, since it presents an idea in a way that convinces buyers to purchase your product. It's an effective way to build trust among your customers, which could result in more sales. To put it simply, it is the art of making customers without interacting with them directly. Instead, it is a more passive way to promote your brand, and to add a certain comfort level with prospective buyers.",
      ],
      sections: [
        {
          title: "Types of Copywriting",
          body: "You probably see this type of marketing strategy as you go through your daily life. When you flip on the radio, turn on the television, or even read the newspaper you have most likely run into some commercial or advertisement. These are some of the more traditional forms, but in today's digital age this type of marketing has crossed over into the web.\n\nHere are some of the more common ways this type of marketing strategy can be implemented:",
          bullets: [
            "Direct mail ads",
            "Taglines",
            "Jingles",
            "Web content",
            "Television and radio commercials",
            "Press releases",
            "Catalogs",
            "Billboards",
            "Brochures",
            "Postcards",
          ],
        },
        {
          title: "How Copywriting Applies to Internet Marketing",
          body: "The methodologies for writing web content differ from other forms of writing, because it uses a more direct and to-the-point approach. Not only does it have to present its message clearly, but it also has to be brief. Many companies use independent contractors to write these articles, and they often appear on blogs and other web pages in order to promote a certain product or service.\n\nThe use of search engine optimization (SEO) is a very important factor, as it helps companies to drive more organic traffic that is targeted toward a specific niche. Certain keywords are strategically placed in a way that it flows naturally with the article's writing style. They're often repeated a certain number of times to ensure the highest possible ranking on search engines, but the writer has to be careful not to stuff them into the article. This will only have a negative impact on what is trying to be accomplished.",
        },
        {
          title: "Reasons to Choose Sidago",
          body: "Sidago Integrated Solutions offers high-quality copywriting services that will help you to:",
          bullets: [
            "Present your corporate goals",
            "Communicate your message to customers",
            "Stand out against the competition",
            "Build a stronger relationship with your clients",
            "Improve the outcome of your marketing strategies",
          ],
        },
      ],
      closing:
        "If you take the time and energy to build an effective campaign, you will get a better return on your investment. We understand the cost of doing business, so we want to make sure you get the best possible results. An effective marketing strategy will not only generate more revenue, but it will also enhance your professional growth. Our staff is here to help you find the best solution for your business. So, call us today to find out what we can do for you!",
    },
    "/services/creative-writing/": {
      eyebrow: "Administrative Support",
      title: "Creative Writing",
      summary:
        "Creative writing helps businesses communicate with originality, personality, and memorability across articles, blog posts, white papers, and other content where interesting text matters.",
      paragraphs: [
        "Creative writing, much like the board game Othello, takes a minute to learn, but a lifetime to master. The difference is this game could cost your company tens of thousands of dollars. The undisputed fact of the matter is content is king, and exceptional creative writing could be what differentiates your company from your competition, in the form of excellent and informative blog posts, articles, white papers, and even social media updates. Creative writing is mandatory anywhere where compelling and interesting text is influential.",
      ],
      sections: [
        {
          title: "The Importance Of Creative Writing",
          body: "While it might seem that the realms of creative writing and business are mutually exclusive, with little overlap, this is not entirely true. And while more traditional business people might not see the benefits, great creative writing can help businesses:",
          bullets: [
            "Stand out from the competition by having great content and copy",
            "Appear intelligent and eloquent to potential customers",
            "Creates amazing, memorable correspondence",
            "Increase the likelihood of content going viral, because it is interesting and useful to real people",
            "Help your company think outside of the box, fostering unique and innovative solutions that no one else has",
          ],
        },
      ],
      closing:
        "Creative writing forces you to use your imagination in a way that make you more aware of yourself and your surroundings. It encourages one to consider a story from various perspectives rather than being limited to a single point of view. Creative writing plays a vital role in literacy development. It is an awesome medium to help make tracks in an opposite direction from life and be in control of whatever you are making. By composing stories, places, and enterprises for your characters, you'll have the capacity to disappear from reality for some time.\n\nFor organizations, good creative writing skills enhance the business's image, increase confidence, boost productivity, and help in achieving goals and objectives on a daily basis.\n\nAfter all, with the internet, great creative writing and content makes the world go round, but a lot of people haven't realized it yet. This creates a unique opportunity to leap ahead of your competition in a way that is much more cost-effective than many comparatively-priced business solutions, while greatly improving your brand identity in the process.\n\nSidago creative writing services:\n\nAt Sidago Integrated Solution, we appreciate the fact that creative writing is more about personal traits and imagination. As our clients mostly demand it in the academic context, we have built a professional team of creative writers to serve and inspire you. To ensure your satisfaction, our authors:\n\n• Always provide 100% original work following your specific requirements\n• Work on a quick turnaround to meet all the deadlines\n• Are available for revisions if you are not satisfied with the work quality\n\nWhether you are a student or you are a professional writer, you can easily seek our creative writing services to manage your various assignments and projects. To make our services more feasible, we offer discounted rates on bulk projects.\n\nMoreover, you may also inquire your order's status to track the overall progress. Please feel free to contact our customer support for any further information and assistance.",
      closingHref: undefined,
    },
    "/services/web-content-writing/": {
      eyebrow: "Administrative Support",
      title: "Web Content Writing",
      summary:
        "Web content writing helps businesses publish clear, useful, well-structured pages that support search visibility, improve conversion, and give visitors the information they need to act.",
      paragraphs: [
        "The internet is becoming increasingly interwoven with daily life. That makes strong website content a practical business advantage, because people often discover, compare, and judge companies through what they read online.",
        "When web content is clear, useful, and well organized, it helps visitors understand what a business offers and why it is worth their attention. When content is weak or neglected, that same website can become a missed opportunity.",
      ],
      sections: [
        {
          title: "",
          body: "The internet is becoming increasingly interwoven with daily life, a fact that can be illustrated by considering the statistics below:",
          bullets: [
            "85% of consumers report that they use the internet to look up local businesses",
            "88% of consumers say that they trust online reviewers opinions",
            "50% of mobile device users are more likely to visit local businesses that advertise online via social media and other networks",
          ],
        },
        {
          title: "What Is Web Content?",
          body: "Roughly speaking, web content refers to the information presented on a website in textual, aural or visual form. Websites that are stuffed with high-quality content are most likely to enjoy the advantages of high web crawler positions and great conversion rates.\n\nNavigating a decent site that contains a great deal of information in an unorganized manner can have a strong negative impact overall. Defining what makes quality web content is a tricky act. The introduction helps individuals figure out if they need to invest more energy perusing, listening or surveying the website.\n\nTo make web content impressive, authors need to deliver incredible information all the time. Having the right content in place is vital to expanding profitability.",
        },
        {
          title: "Some Useful Web Content Statistics",
          bullets: [
            "70% of business to business marketers are creating more content of all kinds this year",
            "What types of content are social media marketers using? 94% report using original written content; 73% are curating other people's content; and 60% report using original visual assets as well as original videos.",
            "The most important content, according to online marketers, is original written content, according to 58% of online marketers asked. 19% said original visual assets were the most important, while 12% said original videos. 10% of marketers found content curation to be the most important, and only 2% of marketers claimed that original audio content was the most important.",
          ],
        },
        {
          title: "Why Effective Web Content Is Needed",
          body: "Web content plays a vital role in providing information relevant to the website as:",
          bullets: [
            "Websites capture interest of users in seconds",
            "Web content is the reason that individuals search and go to your Web pages",
            "If your plans, architectures, and intuitiveness on your site don't give information required by individuals, they will clear out",
            "Web content is a major success determining factor for an online business and any website in general",
            "Concise, clear, engaging, compelling, reader-friendly, original, creative, and web-friendly pages are more useful and easy to read",
          ],
        },
        {
          title: "Reasons to Choose Sidago Web Content Writing Services",
          body: "Sidago Web Content services will enable you to:",
          bullets: [
            "Produce information on website with qualitative and appealing factors, which will be convince-able to more search engines",
            "Present web content aimed at educating, persuading, informing, entertaining, expanding visitors' horizons and changing perceptions",
            "Achieve SEO optimization",
            "Create and present information on websites by understanding targeted audience and industry",
          ],
        },
      ],
      closing:
        "Our web content writers generate original information that is persuading and includes semantically related catchphrases. Please contact our content consultants and expert writers today for high-quality content writing.",
    },
    "/services/translation-services/": {
      eyebrow: "Administrative Support",
      title: "Translation Services",
      summary:
        "Quality translation helps organizations internationalize with clarity—so ideas, contracts, and customer-facing content read naturally in every market you enter.",
      paragraphs: [
        "In our increasingly interconnected global business climate we are living in today, having quality translation services to convey your thoughts as clearly, concisely, and eloquently as possible to as many different languages as possible is quickly becoming a factor that can make or break a business.",
        "Translation is an activity of converting or transforming words or text from one language into another. It ought to incorporate search, context, language structure, grammatical rules, culture, composition traditions, and sounds or concepts that are difficult to convey.",
      ],
      sections: [
        {
          title: "Why Translation Services are Important for Organizations",
          body: "Translation plays a vital role in globalization because it helps in conveying and communicating ideas, information, and documentation in different languages. Despite the fact that English may be perceived as the official language of business, this is becoming less and less so, as the world becomes less Americanized.\n\nMost of the organizations need translation services because it:",
          bullets: [
            "Helps in achieving internationalization, globalization, and localization",
            "Ensures understanding of transactions related to imports and exports",
            "Acts as a source of information and knowledge about foreign cultures",
            "Provides aid in perceiving international, political, and social issues",
            "Plays an important role in the performance of government and international companies",
            "International dialogues depend on successful translation",
            "Helps in promoting tourism all over the world",
            "Aids in customizing business messages according to a specific region",
            "High-quality translation supports attracting customers internationally",
          ],
        },
        {
          title: "",
          body: "Translation helps in summarizing correspondence, reports, promoting, and site content in different countries.",
        },
        {
          title: "Some Things To Keep In Mind When Considering A Translation Service",
          body: "Considering these things ahead of time will make sure you find the best possible translation service for your needs, as well as making sure your time is spent as efficiently and cost-effectively as possible.\n\nWhen consulting a translation service:",
          bullets: [
            "Approach them with an accurate analysis of what is required by your business. If the task involves one small translation, it might make sense to hire an individual. However, if it is necessary to translate something on a much more extensive level, then it is important to hire the right business that will establish your brand in the right geographical market.",
            "Will you be needing automated or machine translations, or will you be requiring human translation?",
            "What industry do they specialize in?",
            "Are they native speakers of the language in question?",
            "Do they have any references?",
            "How long have they worked in the industry?",
            "What separates them from the competition?",
            "Are they up to date, technologically?",
            "Are they client-oriented?",
            "What do you value?",
          ],
        },
        {
          title: "",
          body: "Knowing what you value will help you find the translation service that is most in line with your vision, and portray your company in the way you want to be seen.",
        },
        {
          title: "Why Should You Choose Sidago Translation Services",
          body: "We provide high-quality translation services to individuals and corporations.\n\nOur highly qualified and experienced translation team helps in:",
          bullets: [
            "Translation",
            "Proofreading",
            "Research",
            "Interpretation",
            "Linguistic problems",
            "Transcription",
            "Multilingual research",
            "Web programming",
          ],
        },
        {
          title: "",
          body: "Our translation services are for all international languages, and we maintain strict confidentiality. Our assistance for translation is available nationwide and worldwide. We provide affordable, trustworthy, and fast translators to our clients and customers according to their requirements.",
        },
      ],
      closing: "Please feel free to contact us for any further inquiries and assistance.",
      closingHref: "/contact",
    },
    "/services/data-mining/": {
      eyebrow: "Administrative Support",
      title: "Data Mining",
      summary:
        "Data mining turns large databases into actionable insight—so teams can reduce risk, sharpen decisions, and move faster than the competition in a data-driven economy.",
      paragraphs: [
        "The internet is a double-edged sword. On one hand, it offers more opportunities and resources for the canny corporate businessperson and the savvy marketer while, on the other, there are more demands, pressures, and things to know for every single member of an organization, from top to bottom. It is more imperative than ever before for a company to take advantage of every opportunity at their disposal, and save time and resources when they can. Data mining offers almost unparalleled insights for companies of all sizes.",
        "In fact, Big Data and data mining is predicted to be a $50 billion industry by 2017. Best learn to take advantage now, before your competition.",
      ],
      sections: [
        {
          title: "Why Organizations Need Data Mining Services",
          body: "Data mining involves extraction of concealed prescient information from extensive databases. It is an intense innovation with the great potential to help organizations concentrate on essential data in their information stockrooms.",
        },
        {
          title: "Some benefits of data mining for businesses include:",
          bullets: [
            "In finance and banking, data mining is used to create accurate risk models for loans and mortgages. It is also very helpful for detecting fraud.",
            "In marketing, data mining techniques are used to increase conversion rates, improve customer satisfaction, and create targeted advertising campaigns. They can also be used for predictive behaviors, such as coming up with ideas for completely new product lines.",
            "Retail stores use customer shopping habits and details to optimize the layout of their stores.",
            "Tax governing bodies use data mining techniques to detect fraudulent transactions and single out suspicious tax returns.",
            "In manufacturing, data mining can be used to improve product safety, usability, and comfort.",
          ],
        },
        {
          title: "",
          body: "No matter what industry you are in, Big Data and data mining can make your operations more streamlined and focused. To find out how our data specialists can help take you and your company to the next plateau, contact us today!",
        },
        {
          title:
            "Data mining is needed in an organization for some of the following reasons:",
          bullets: [
            "Helps in data collection and storage at a rapid speed",
            "Management of raw facts and figures",
            "Derives ways for effective data usage",
            "Helps in agile computerization of data",
            "Ease in fraud detection",
            "Increases customer loyalty",
            "Improves market segmentation",
            "Helps in risk management",
            "Ensures better decision making",
            "Production control is also achieved",
          ],
        },
        {
          title: "Reasons to Choose Sidago Data Mining Services",
          body: "We provide effective data mining services to cut down cost by focusing on the right area. Our high-quality services will help you in the following ways:",
          bullets: [
            "Our data mining approach is viable and proficient to find the imperceptible to obvious information from databases",
            "Information mining apparatuses will foresee future patterns and practices, permitting you to make proactive, learning-driven choices",
            "We help you to control the content of information for different purposes and objectives",
            "Our experienced and qualified team aids in data extraction and scanning, updating and upgrading databases, and extraction of meta-data",
          ],
        },
      ],
      closing:
        "You can get assistance from our expertise for resolving data mining problems. You can also consider us for any outsourcing needs. For any further inquiries and assistance, please feel free to contact us today.",
      closingHref: "/contact",
    },
    "/services/advertising/": {
      eyebrow: "Advertising & Marketing",
      title: "Advertising",
      summary:
        "Advertising support that helps businesses choose the right channels, shape stronger campaigns, and measure performance across both online and offline media.",
      paragraphs: [
        "In advertising, Sidago offers consultancy services and we also serve as a link between you and the different players you may want to engage. An advertising campaign has many different sides to it, depending on how much you want to exploit the various possible options that there are. The advertising methods we vouch for are agreed on by our advertising teams and your representatives so that we can come up with the actual marketing strategy and propose the best methods to achieve the results that you desire.",
      ],
      sections: [
        {
          title: "Here's a quick overview of what we have to offer in the realm of advertising.",
          body: "",
          bullets: [],
        },
        {
          title: "Offline advertising",
          body: "We are in a position to link you with offline advertising outlets. These are the conventional advertising methods such as television, radio, and print media. With our experience and relationships with these media outlets, you're sure to get the best rates for your adverts.",
        },
        {
          title: "Online carriers",
          body: "These are the carriers of advertisements who utilize the internet to disperse their content. The content could include audio, video, and written content. Animations and other graphics such as GIF images are included. We help you manage the way you interact with these carriers. They include websites, affiliate marketers, advertising companies such as Google Ads, and video channels such as YouTube.",
        },
        {
          title: "Audio and video ads",
          body: "We prepare the advertisements that you need to bring you the best results. Working with our team, we prepare captivating ads for your products. Our ads are creative and they capture the attention of your targeted market. We have a large network of media production companies who are always ready and willing to prepare these ads for our clients.",
        },
        {
          title: "Graphic Design",
          body: "If your advertisements includes graphic work, we're here to help you. Our media partners prepare the graphical work for you to your satisfaction. This may include caricatures, animations, drawings, or photographs.",
        },
        {
          title: "Analytics",
          body: "You don't want to run an advertising campaign blindly. To this end, we prepare analytical tools that help you monitor and evaluate the progress that your adverts are making. These tools and methods also enable you to assess the penetration of your advertisements and generate data that indicates how much effective your advertisements are. Our tools and methods run on both online and offline platforms. Therefore, they can be used to evaluate both online and offline advertising campaigns.",
        },
        {
          title: "Report writing",
          body: "We write reports for you so that you can easily track the progress you're making. These reports are based on the data generated by our monitoring and evaluation tools. The parameters taken into consideration include consumer feedback and any differences in the output of your company in form of sales.",
        },
      ],
      closing: "Are you ready to kick start your ad campaign? Let us know!",
    },
    "/services/customer-acquisition-sales/": {
      eyebrow: "Advertising & Marketing",
      title: "Customer Acquisition & Sales",
      summary:
        "Customer acquisition systems that help teams attract prospects, structure follow-up, convert leads, and improve sales visibility across the full funnel.",
      paragraphs: [
        "Customer acquisition is a whole set of methods and techniques to manage the prospective customers who may contact you or inquire about you. There are a variety of marketing techniques that are employed. Acquiring new customers can also be the needed step between effective advertising and good management of customer relationships. Good customer acquisition facilitates a good constant inflow of customers as long as the proper methods are utilized.",
        "At Sidago, we will consult with your staff and see how you can effectively have good customer acquisition methods that are suited for your company. We carry out an analysis of your contact forms and advertising to determine the main channels through which your prospective customers can contact you. We then develop channels and protocols to be followed in turning these prospects into loyal customers for you.",
        "We ensure that the adopted policies are suitable for your company and can be easily implemented in your unique business environment. Our team of business consultants will come up with several tools to be used in the various stages of customer acquisition. We will have your reception staff trained in handling new prospects that may come to your premises. We also generate many templates for the first response emails you may need to send out. Each of these templates is unique and suited for different types of customers.",
        "We come up with a lineally progressive system of procedures to be followed. Your first response to the prospective customer will be to further their interest in you and have them wanting more. This is in effect the first sale of your company since the person is hooked, all that waits is for you to tactfully pull in the line.",
        "Our methods ensure that your company will be proficient at advertising, handling the customer inquiries, responding to these inquiries, effectively capturing studies, and filtering them. After these inquiries are filtered and directed to the appropriate personnel in the company, the leads are graded and arranged in order of priority. This is an important step in the process since haphazard handling of leads could cost you good prospects and leave you with smaller unstable customers. Therefore, you have to prioritize rightly the leads to follow first and those to leave for later.",
        "The other thing we train your staff to do in the process of acquiring new customers is distributing the lead and having someone assigned to follow the lead. The important sales call comes in at this stage and then the lead is nurtured with time and hopefully retained. Retention of leads is not a simple task and requires savvy staff to do it in the most effective manner possible.",
        "You'll see the results of our services through your increased sales and through our analysis of promotion effectiveness that we do for you. We'll as well create processes and methods to track key acquisitions so that you can easily get an accurate picture of the way traffic flows to your business and the results that the traffic has.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/email-marketing/": {
      eyebrow: "Advertising & Marketing",
      title: "Email Marketing Solution",
      summary:
        "Email marketing services that cover prospect outreach, data handling, campaign setup, automation, and reusable templates for ongoing customer communication.",
      paragraphs: [
        "In email marketing, there are many different activities involved. You need to have the email contacts of both current and prospective customers. Sidago offers you complete email marketing solutions for your business and helps you achieve your goals in opening up new markets. We offer a complete range of services that enables you to contact prospective clients and keep in touch with them as turn them into your customers.",
      ],
      sections: [
        {
          title: "Here's a quick look at the email marketing services that we offer right here at Sidago.",
        },
        {
          title: "Contact Email Templates",
          body: "We prepare templates and full emails for your use in making the initial contact with your prospective clients. Each of these emails is tailored to suit a specific set of people who are in your contacts lists. We do not just give email contacts, we try to find out as much as we can about the owners of the email addresses. This extra information allows us to be able to come up with targeted email responses.",
        },
        {
          title: "Data Management",
          body: "How easy is it to manage thousands of emails and the accompanying demographic information? At Sidago, we have programmers and software developers who have developed software that suits your needs. The software has immense capability and manages your data including sending automatic responses, updating demographics, and generating statistics about client interactions.\n\nThis is software that can easily be integrated into your own office software or company systems to make it easily accessible to your staff on one platform.\n\nAt Sidago, we also prepare methods for you to keep records of the clients you have sold to and what they bought amongst other additional information. This will help you easily determine customers who may be viable to buy other related products you may offer, know when to approach the client again, and help you in seeking feedback from the customers you've served.",
        },
        {
          title: "Email Mining",
          body: "Over the years of doing email marketing, we've compiled several databases packed with millions of active email addresses. When you work with Sidago, you have access to this and we refine the results down to only those who could produce you with the return on investment that you're seeking. We also implement email marketing campaigns for your current subscribers to keep them from turning into cold leads.",
        },
        {
          title: "Full Campaign Setup/Management",
          body: "We've helped many of our clients develop their email marketing campaigns from scratch and we can take this expertise to use it in developing one for your company as well. The power of email marketing is nothing but phenomenal and we'd love for you to taste the success that many of our other clients are currently experiencing.\n\nAs for management, we have monthly packages available that we'll customize specifically for your company. This way it can be a hands off branch of your company.",
        },
        {
          title: "Response templates",
          body: "We create templates that you will use in your responses to clients. Those who contact you, be whether it's for the first or second time, expect some sort of feedback from you. This is why we develop custom email response templates for your use. The templates are sent to each potential client after your staff evaluate the best template for a specific customer. Optionally, these templates can be sent automatically.\n\nContact one of our email marketing specialists today!",
        },
      ],
      closing: "Contact one of our email marketing specialists today!",
    },
    "/services/lead-generation/": {
      eyebrow: "Advertising & Marketing",
      title: "Lead Generation",
      summary:
        "Lead generation support that helps businesses attract qualified interest, build scalable processes, and improve conversion from prospect to sale.",
      paragraphs: [
        "Lead generation is the practice of arousing customer interest in the goods and services offered by your company. This is a process in marketing that may in some events fall under the category of advertising. At Sidago, we not only help you generate leads, but we will also help you convert those leads into sales.",
        "With more than 10 countries of operation and serving hundreds of different companies (each with unique needs of their own) Sidago has developed methods to generate results for companies in a wide array of business environments. We have the capacity to carry out training and integrations as a lead generation partner with you.",
        "We've developed proprietary tools and processes specifically for lead generation which helps us maintain the best lead generation services in the industry. We also help you monitor the progress (and return) of your customers as well as your employees. Our ultimate goal is to help remove the ceiling when it comes to boosting your capacity to operate and your return on investment.",
        "Our lead generation team will train your staff on how to generate leads from conventional sources such as telephone calls, advertisements, search placements, review websites, and more. Sidago aims to continue to be your trusted partner during the process of setting up and implementing your lead generation processes and campaigns.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/market-research/": {
      eyebrow: "Advertising & Marketing",
      title: "Market Research",
      summary:
        "Market research that helps companies understand customers, test assumptions, and shape decisions with structured survey, sampling, and analysis methods.",
      paragraphs: [
        "Progress is always determined and guided by market research. With good market research, you're able to formulate strategies that will guide your company forward. Other types of market research helps you develop company protocols and policies on the way you handle business within your company. It's important for a company to constantly engage in market research to find out the needs of their customers and how satisfied customers are with the currently offered goods/services.",
        "The common survey and research methods that we employ include the use of questionnaires as survey tools in different types of research. These can be filled at designated points or in door to door style campaigns. Our team of researchers working with their assistants are able to determine the best approach for your survey. We also make good use of other research and data collection tools such as interviews, sampling, and testing. Our methods can be used in both random sampling and targeted sampling depending upon the section of the market that you are hoping to lure in with your products.",
        "In the process of surveying and research, we also undertake case studies for your company and present our findings to you in an easy-to-understand manner. We find out the reasons behind the successes or failures of other companies and come up with ways to avoid failure coming your way while embracing the good practices that could lead you to success.",
        "Technology has not been left out in our selection of survey and research tools. We employ different forms of very modern technology and software to capture data and demographics for your company. We are able to analyze market trends and keep track of the happenings and user responses from your customers. We know that you want to be always aware of the market response to your presence.",
        "At Sidago Integrated Solutions, we have different methods through which we employ to carry out market research and conduct surveys for you. Our experience in the field has been gained over many years of work conducting surveys for various clients. Therefore, we have a wide array of tried and tested methods that have been approved as appropriate and workable, and which we can use to help fuel the success of your company.",
      ],
      closing: "Use our services today and you will not look back.",
    },
    "/services/negotiation-management/": {
      eyebrow: "Advertising & Marketing",
      title: "Negotiation Management",
      summary:
        "Negotiation support for organizations that need experienced dealmakers, stronger preparation, and disciplined process management across complex business discussions.",
      paragraphs: [
        "Sidago Integrated Solutions has experts in business negotiations who are ready to employ their skills in negotiating the best deals for you. Our teams of negotiators are able to handle a wide range of negotiation factors including the assignment of functions and roles of each player, legal issues of a business deal, and the raising of capital as well as how profits and other benefits are to be shared.",
        "Our negotiation experts work in well synchronized teams. They are highly qualified and have gained extensive experience in negotiating business deals over the years. We equip our negotiators with the unique skills and capability to negotiate on behalf of our clients by ensuring that they are well versed with the latest negotiation methods.",
        "From years of experience gained in numerous negotiations done on behalf of our clients, we have learned that a good negotiation is based on having solid information. We take a lot of time and dedicate the best personnel and resources to digging up information about your own organization as well as that of the organizations we'll be negotiating with. This helps us to be able to negotiate from an informed point of view. This also allows us to avoid getting your company into agreements which could be hard for you to fulfill or working with organizations that may not deliver on their end of the bargain. We ensure that you work with reputable companies to build on your image and avoid disappointments that may lead to a tarnished corporate profile.",
        "In the negotiation process, we are sure to get you good deals that are going to be beneficial to your organization. We employ both distributive and integrative negotiation forms with full use of various integrated tools in the setting of agenda, defining our positions and in getting final agreements. Our experts use positive negotiation methods and tactics that make all the parties comfortable with the reached deals and reach reasonable compromises.",
        "We can engage in both good faith and bad faith negotiations on behalf of our clients. Bad faith negotiations are when you do not want to be seen as refusing to negotiate yet you are not prepared to reach any agreements. It would be bad for corporate image if such a negotiation was done by directly employed negotiators but when you hire us to do it for you, you're able to retain a good corporate image and buy time to sort out your matters without pressure.",
      ],
      closing: "Contact one of our negotiation specialists today!",
    },
    "/services/online-marketing-strategy/": {
      eyebrow: "Advertising & Marketing",
      title: "Online Marketing Strategy",
      summary:
        "Online marketing strategy work that helps businesses plan, coordinate, and execute digital growth programs with more structure and commercial discipline.",
      paragraphs: [
        "Developing a strategy is the first step for anyone who's venturing into any project. The field of online marketing is no different from others when planning is considered. For your business to succeed in its online marketing campaigns, you will need a solid marketing strategy to guide you and help you evaluate the progress that you're making. Failure to plan is seen in management circles as a plan to fail, so you will need a strategy to show you the way.",
        "At Sidago, we provide you with the planning and strategizing brainpower you need. A sound marketing strategy could mean the difference between the failure and the profitability of your company. This is even truer if your business is involved in online sales. We develop various online sales solutions and the marketing strategies to accompany them.",
        "Our online marketing strategies are developed by our dedicated team of professionals in various aspects of online marketing to come up with strategies that suits your business. The team works in tandem with the management team of your company so that the proposed strategy is tailored to meet the unique requirements of your business and to ensure that it's feasible.",
        "Our marketing experts will come up with a sound online marketing strategy that includes the activities that are expected to be carried out and how they will be carried out. We also explore various monitoring/evaluation methods and techniques so that we can recommend the best solution for your company.",
        "Getting your staff to embrace the strategies and work within them becomes easy since the strategies are friendly to the implementers without requiring too much from them. In the event that you're not in a position to provide staff to implement the developed strategies, we're ready and willing to lend you with a helping hand. We have marketing management professionals who are always eager to implement the online marketing strategies of our clients and see them through to the end. All this is done by our company's staff to maintain efficiency in the execution of strategy tasks and ensure the effectiveness of our efforts.",
        "You have no reason to go elsewhere to look for online marketing strategies. Sidago has it all taken care of. We'll embrace your company no matter the size or demand of capital resources and develop winning strategies that will put you at the forefront of your industry.",
      ],
      closing:
        "Get in touch with one of our marketing experts today to schedule your consultation!",
    },
    "/services/public-relations/": {
      eyebrow: "Advertising & Marketing",
      title: "Public Relations",
      summary:
        "Public relations support for reputation protection, media communication, social response management, and customer-facing training during sensitive situations.",
      paragraphs: [
        "The corporate image of your company requires careful handling and management. At Sidago, we offer you sound management solutions to keep your name untarnished. Investors and partners will be ready and willing to be associated with your good name in business deals. As such, anything that happens in your company needs to be closely guarded and only what you need to be released to the public should be known.",
      ],
      sections: [
        {
          title: "What do we have to offer you in our public relations packages?",
        },
        {
          title: "Press Releases",
          body: "We prepare press releases for our clients when there are press conferences to be held. Sidago has a press relations and media management team that researches situations and prepares appropriate press releases that keep your corporate image shining like a diamond. In the event that improper happenings take place and you have to salvage your image, we prepare damage-control press releases that will win you back the public favor.",
        },
        {
          title: "Company Statements",
          body: "The best way to keep ahead of your competitors when it comes to public image is to have frequent periodical company statements. These are in the form of written statements that are released to the public domain to keep the public updated on the happenings within your company.\n\nWhat this does is it creates an image of an open company with no secrets that the public loves. We prepare these statements and show the public the human side of your company for increased connection with your customers while transparently delivering the story of your company. It makes it possible to dissociate yourself from bad happenings and have apologies accepted quickly as well as easing the task of salvaging your image if something goes wrong.",
        },
        {
          title: "Social Media Management",
          body: "We train your staff on how to take care of your social media profiles and pages. The modern age has seen most seller-buyer interactions shift to the internet platforms. A company that is not present on the internet will lose a great chance to acquire new customers.\n\nThey could also end up with a bad reputation on social media since they could be overlooking critical input from the public. Our social media management team helps you deal with difficult customers who may spread misinformation on the internet and erode the good image of your company using professional methods.",
        },
        {
          title: "Customer care personnel training",
          body: "How well trained are your customer care personnel? We train your customer care personnel to help them keep their calm as they serve customers. Customer care is usually confronted by angry customers complaining, wanting their cash back or compensation while others are simply seeking information about your company. It's critical to your company's success that your staff doesn't transfer the frustrations to your customers while representing your brand.",
        },
      ],
      closing: "Contact us today to discuss your PR needs!",
    },
    "/services/social-media-marketing/": {
      eyebrow: "Advertising & Marketing",
      title: "Social Media Marketing",
      summary:
        "Social media marketing support that combines content planning, platform management, moderation, tooling, and campaign coordination across multiple networks.",
      paragraphs: [
        "At Sidago Integrated Solutions, we prepare strategies to use in your social media marketing campaigns and solutions for your overall social media marketing to propel you to greater efficiency, online visibility, and ultimately an enhanced level of profitability. We aim at integrating our proposed social media marketing methods with your overall marketing strategy to have them complement each other.",
        "For your software needs, we have software developers who come up with creative and interactive plugins for your website and other online presence platforms. These increase the interactions with your clients since you can post information such as ads and communiques directly to your social media pages and profiles with ease. The efficiency and ease of caring out your social media marketing needs is what drives us to look for the best solutions for you.",
        "When it comes to the management of your social media profiles and pages, we have personnel who can take care of the required posting of information and regulate the way the page is used. Commenters and their comments are monitored to ensure that no abusive, discriminatory, or inappropriate content is seen on your social media pages. This is important so that you have quality material that's truly functional for you. The aim is to make the market aware of your product and possibly direct them to where they can make a purchase.",
        "We believe that social media marketing should be multi-platform and well coordinated to achieve the best results. We avail to you a team of managers to engage with your staff and train them on how to go about managing the various social media profiles and pages that you may have. We also avail analytical tools that can be used on your social media marketing campaign to assess how effective you are in penetrating the social media scene.",
        "In content management, we prepare pre-arranged postings for your social media marketing campaign. These are posted in a steady flow of information and calls to action to get the social media abuzz with the news about your brand. Remember that consistency is crucial to a successful social media marketing campaign. In events where there was no pre-planned post but a situation occurs and a posting is appropriate, we are at hand to quickly prepare a statement or release that will be used. We plan ahead and at the same time are ready to tackle arising matters.",
        "Sidago Integrated Solutions takes pride in being a complete solution to make the most out of the many social networks online today. We ensure consistent and sustainable campaigns that can be run over varying periods of time depending on the products being sold. We thus position ourselves to be the best partner for you, whether you're running a social media marketing campaign only or a hybrid integrated marketing strategy.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/telemarketing-telesales/": {
      eyebrow: "Advertising & Marketing",
      title: "Telemarketing/ Telesales",
      summary:
        "Telemarketing and telesales support that helps businesses structure outreach, train staff, improve call handling, and build trust with prospects over time.",
      paragraphs: [
        "We offer telemarketing and telesales services here at Sidago Integrated Solutions. Telemarketing is also called telesales and it's simply a method of directly marketing your products to prospective customers with a telephone call. A recent development in telemarketing is the use of web chats and online conferencing. Face to face meetings can also be arranged during the phone call for your sales person to meet the prospective customer.",
        "We'll help you set up a telemarketing center either on your business premises or you can utilize our call center that's already in place. There is also an upcoming trend where you can recruit freelance telemarketers for your company. We can get these freelancers to make the telephone calls on behalf of your company and sell your products. They can work from home or office premises. Our unique abilities to hire committed and hard working personnel for you ensures that you'll get the best staff and return on your investment.",
        "We make sure that your telemarketing campaign is ran successfully to bring in the best results for your company by having methodologies that distance you from the political telemarketing perceptions and the fear of scams by customers. Telemarketing may lead customers to feel pressured and thus we have come up with methods to ensure full customer trust and confidence in your company.",
        "Our protocols for your company involve determining the number of telephone calls to be made and how to handle prospective customers. We have come up with various models and techniques that can be adapted to suit your business venture. We'll also show your staff different strategies to determine your customers' needs, follow up with an offer, and make a sale. Getting prospective customers is a difficult task and as such, we train your staff on how to look for customers based on their purchase history and their previous requests for information among other tactics.",
        "Sidago wants to see your company succeed. We have come up with methods for you to embrace technology in your telesales campaigns. We're also able to develop software for you to keep track of your various customers so that you can contact them in the future.",
        "We additionally come up with voice recordings for automated calls if you wish to go that way. However, we advise our client companies to avoid automation when it comes to outbound calling since it leads to fears of being overcharged or conned, and also disconnects you from direct interaction with the customers which is something that's not beneficial to your company.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/branding/": {
      eyebrow: "Advertising & Marketing",
      title: "Branding as an Important Part of Growing Your Business",
      summary:
        "Branding support that helps companies define identity, build credibility, and create stronger long-term customer recognition in competitive markets.",
      paragraphs: [
        "Successful branding will give your company an edge in today's fast-moving market. It will not only let people know what they can expect from you, but it will also set you apart from the competition. I think Steve Jobs put it best when he referred to creating raving fans of your product. Now, Apple is one of the most valuable companies on the stock market.",
      ],
      sections: [
        {
          title: "What goes into a good brand?",
          body: "A solid brand can be a tremendous asset for any organization, and it plays a vital role in any marketing campaign. But what goes into a good brand?\n\nA good brand can move you strategically against the completion, and it takes a great deal of time and thought to develop. It should clearly explain what your company is about, and it needs to establish some sort of credibility with prospective buyers. Coca-Cola is a great example. There are other colas on the market that are much cheaper, but there's only one Coca-Cola, a name that people associate with great taste and quality.\n\nBut it's not just about creating a name. People need to feel connected to your company on a deep emotional level, and that will get them to continue buying their products. Make sure you understand what your customers want, and they will stay loyal.",
        },
        {
          title: "How to create a good brand?",
          body: "As I said before, branding is a strategic move, so it takes time to develop. How well your brand stands up against the competition will determine whether or not your customers will stick around.\n\nThe first thing you need to think about is your logo. Customers will associate this with your company, so it needs to be meticulously designed. Your logo is a visual representation of your company's message, and your slogan should clearly express what you want people to think of your business. What are the benefits of your product, and what should they associate your company with? Most importantly, your actions should be consistent with the message you want to convey.",
        },
        {
          title: "The benefits of Sidago branding services.",
          body: "Your brand is the wellspring of a guarantee to your company. That's why Sidago Integrated Solutions is a great resource. They provide quality branding services, and it strives to find the best solutions to its customers. We assemble and develop your brand in order to establish the culture and uniqueness of any organization. We focus on the specific demands of each client, and we take their objectives into careful consideration. So, every one of them can stand out against the competition.\n\nAfter all, a strong brand is an important part of any organization who wants to stand a chance in today's competitive market. Investing in the time and energy that it takes to build a successful brand is an essential part in establishing your reputation. With Sidago by your side, you can be the proverbial king of your own castle. So, contact us today to find out what we can do for you!",
        },
      ],
    },
    "/services/display-marketing/": {
      eyebrow: "Advertising & Marketing",
      title: "The Use of Display Marketing to Advertise your Business",
      summary:
        "Display marketing services that help businesses choose ad formats, target traffic, and improve campaign effectiveness across visual web placements.",
      paragraphs: [
        "Display marketing is the type of advertising you normally see on websites. These ads can come in a variety of formats, and they can be presented in a number of different ways. They're designed to drive traffic to a specific website, and they can be targeted towards a certain group of people. This can be a science in and of itself, but if it's done right display marketing can be a very effective advertising tool.",
      ],
      sections: [
        {
          title: "Types of Display Ads",
          body: "As I said before, display ads can come in a variety of styles and formats, and the one you choose depends on what your target market is. Some ads can display some type of video advertisement or commercial, which has proven to be a very effective display marketing tool. Display ads can also incorporate rich media, such as flash, that can expand on a mouseover. They can also come in the form of overlays, which can be removed by clicking on a close button.",
        },
        {
          title: "Display ads can also come in a variety of sizes, but there are some that are standard:",
          bullets: [
            "Banner ads (720 x 90)",
            "Big box ads (300 x 250)",
            "Skyscraper ads (160 x 600)",
            "Square ads (250 x 250)",
          ],
        },
        {
          title: "Creating a Good Display Ad",
          body: "In the midst of all the options you have at your disposal, it's no secret that finding the right display marketing campaign can seem like a daunting task. It's important to understand your market and what kind of people you're looking to attract. You want to make sure you're driving targeted traffic to your site in order to make your display ads more effective, and you want to use effective branding strategies to create customer loyalty. You can always drive sales by offering special discounts to people who are already in the funnel.\n\nMake sure you experiment with different types of ads to see which ones are the most effective, and you don't want to rely on just one type. You should use a variety of ads with different calls to action in order to drive a more diverse type of traffic within your target market, of course.\n\nAny display ad you create should have a clear and concise message, and it should be as short as possible. You want to have a good company headline, followed by an eye-catching image. Rich media and flash ads especially ones that incorporate videos have proven to be more effective than static image ads. So, you should bear that in mind. And you should diversify your marketing strategy instead of just using one type of advertising campaign. This could only help you to drive more sales.",
        },
        {
          title: "Using Sidago for Display Marketing Services",
          body: "When it comes to designing display ads, Sidago Integrated Solutions has everything your company needs. We have a complete and advanced commercial system, and we cater to our clients' objectives by offering the best solutions available. Anything from display advertising, social networking promotion, and web index showcasing will give your company a versatile advertising platform. We intend to keep your business image positive, and we will give you a prominent presence for potential customers.",
        },
      ],
      closing:
        "Feel free to contact us for any additional information on the types of services we provide.",
    },
    "/services/viral-marketing/": {
      eyebrow: "Advertising & Marketing",
      title: "Viral Marketing",
      summary:
        "Viral marketing support that helps brands design shareable campaigns, strengthen social reach, and turn customer attention into wider market visibility.",
      paragraphs: [
        "On the Internet, viral marketing is any promoting method that actuates web locales or clients to promote a message to different destinations or clients, making a conceivably exponential development in the message's visibility and impact.",
        "One sample of fruitful viral promoting is Hotmail, an organization now claimed by Microsoft that advances its administration and its own particular promoters' messages in every client's email notes. Viral advertising portrays any technique that urges people to go on promoting a brand to others. This results in a positive introduction of your business to the potential clients. Like infections, such systems exploit fast augmentation to blast the message to millions.",
        "Viral marketing is the objective of numerous organizations hoping to influence social networking space to advance their items. Characterized as bit of substance produced by a man or business that motivates customers to enthusiastically impart it to their extended social circle, viral marketing can help construct brand acknowledgment immediately yet is simpler said than done.",
        "In today's interconnected world, word-of-mouth advertising is more important than ever before, and social media is one of the major ways this word is spread.",
      ],
      sections: [
        {
          title: "Some useful viral marketing and social media statistics include:",
          bullets: [
            "Millennials, the age demographic in their 20s and mid-30s, are twice as likely to seek advice or information from social media as Generation X and the Baby Boomers",
            "68% of Google+ users are male, while Pinterest tends to favor women, who make up 80% of their users.",
            "Social is important or somewhat important in marketing and branding, according to 80% of business leaders",
            "The majority of American internet users, an amazing 72%, over the age of 18 are on at least one social network",
            "Viral marketing can help or harm a company's reputation. Complaints that go unanswered on social media networks can becoming viral, damaging a company's brand. But it goes the other way as well, with 71% of consumers who receive a quick response on social media saying they would likely recommend that brand to their friends and family.",
            "The majority of global business executives, 65%, say their organizations use social media tools to understand market shifts, while 45% use them to improve insight into operations and identify exceptional talent within their organization.",
            "Over 700 YouTube videos are shared on Twitter every minute, with over 500 years worth of YouTube videos being watched by Facebook users every day.",
            "LinkedIn is a highly useful social media network for advertisers, with 60% of LinkedIn users claiming to have clicked on an ad on the site. 43% of online marketers have obtained at least one new customer through LinkedIn.",
          ],
        },
        {
          title: "Viral marketing plays an important role in:",
          bullets: [
            "Increasing business reputation",
            "Getting customers attention",
            "Increasing brand awareness",
            "Enhancing business effectiveness",
            "Providing competitive edge in market",
            "Achieving high social networking.",
          ],
        },
        {
          title: "Sidago Viral Marketing Services:",
          bullets: [
            "Our viral marketing administrations spread following of viral crusades, idea creation, and accommodation.",
            "As a component of our services, we additionally help to execute extremely viable, exceedingly intelligent, viral marketing campaigns to catch the consideration of reach your intended audience.",
            "Our viral marketing services are affordable and user friendly, and they will help you to establish business reputation quickly. Let the experts of Sidago Viral Marketing Services help you proficiently meet your viral advertising needs.",
          ],
        },
      ],
      closing:
        "If you have any further questions in regards to viral marketing arrangements, please feel free to contact us today!",
    },
    "/services/3d-modelling/": {
      eyebrow: "Design & Multimedia",
      title: "3D Modelling",
      summary:
        "3D modelling support for media, product, industrial, and presentation use cases where realistic digital models improve planning, explanation, and visual impact.",
      paragraphs: [
        "3D modeling has seen an increased uptake over the years since its inception. This is a great use for technology that has seen usage in industries such as film, interior design, animations, gaming, and architecture. In the field of medicine, 3D models are used to represent anatomical features in an interactive way. If your business company has any needs that are met by utilization of 3D models, Sidago has the answer for you.",
        "For the company in the media and event industry, we offer solutions tailored along your company requirements for stage and set design. For this, we have a wide range of modeling software that can be used to simulate mechanical operations. The mechanical parts are additionally modeled into accurate and realistic digital representations before their actual construction to observe their functionality. In industrial design, we model products before you present them to your clients.",
        "Our 3D modeling team is staffed by well-trained personnel who have innovative and cost-efficient methods of developing your models in the highest quality possible within short periods of time. We also have 3D modeling capacity for simulation and rendering of images in 2D and 3D. We create our models both manually and automatically using approved techniques that we have tried, tested, and found to be the most effective.",
        "The advantages that 3D modeling gives you over conventional 2D models is that you achieve greater flexibility with your models since you can change angles of view and animate images accompanied by faster rendering of the changes. You also have easy rendering and automatic calculation with photorealistic effects. This saves you from having to mentally visualize details or estimate results. For those who want realism and accuracy, 3D models are your answer. For the best of both 2D and 3D, we're able to combine 3D modeling and follow it up with 2D images rendered from the 3D model.",
        "At Sidago, we present our models in the three major ways: polygonal modeling where we form a polygonal mesh by using different points in 3D space connected using line segments, curve modeling using curves defined by weighted control points, and the fairly new digital sculpting. We stay on top of any emergent developments and constantly explore ways to apply them in out solutions to your business needs.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/animation/": {
      eyebrow: "Design & Multimedia",
      title: "Animation",
      summary:
        "Animation services for advertising, promotional media, product storytelling, and multi-format visual campaigns across 2D and 3D outputs.",
      paragraphs: [
        "Different companies need animations for various uses. There are those that use them as an integral part of their products and/or services and then there are others who need animations for their advertisements or promotional videos. Whatever the intensity of your needs, Sidago has the ability to deliver the highest quality animations directly to you.",
        "At Sidago, we use computer generated and computer assisted animation. We are able to come up with animations in different formats that are used within the industry today. Our team of dedicated animators is highly trained and experienced in animation production. They have made thousands of animations for our clients already.",
        "For the less intensive consumers of animations, it's better to employ our expertise and create animations for them instead of setting up an animations department. Our animators at Sidago will ensure that you get high quality animations that will suit your business needs. We produce full animations, limited animations, rotoscopes, live-action animations, stop motion animations, and puppet animations. We use standard and advanced techniques to develop our animations so that each one of our clients have a high quality experience.",
        "In recent years, we've increased our capacity at Sidago to create animations in 3D. This allows us to render images in 2D from our 3D animations so that you can use our animation characters across several platforms. An example is where we produce a video animation for you in 3D for your video advertising needs. If you go into still image advertising such as posters and banners, we can render the images of your video animation characters and use the images on your posters in 2D.",
        "For whatever animation needs you have, Sidago Integrated Technologies has the solution for you. Feel free to contact us and we'll discuss your needs and come up with the most suitable solution for you and your company.",
      ],
    },
    "/services/audio-production/": {
      eyebrow: "Design & Multimedia",
      title: "Audio Production",
      summary:
        "Audio production services for announcements, advertising, IVR and call systems, voiceovers, training, and company communication at scale.",
      paragraphs: [
        "Companies need audio tracks for their various needs within and outside the company premises. These different unique needs can all be attended to by Sidago Integrated Solutions. We have experience in producing audio accrued over many years and have developed innovative solutions to meet the requirements of our clients. In today's business environment, a single company that operates alone has little chances of success. This is why we're here as your staffing partner, as we know your success is our success.",
        "We have audio production facilities that produce very high quality audio products for a wide array of needs. Companies use audio for different needs such as automated company messages, voiceovers in advertisement, accompaniment jingles, automated instructions, and status updates within the company premises.",
        "For advertisement needs, Sidago Integrated Solutions has a talent pool of proficient producers who come up with voiceovers and jingles for your advertising needs. Our reach includes musicians and talented speakers who write and produce excellent audio tracks that carry your message with high clarity. We ensure that you're fully involved in the process of scripting and actual audio production of your audio tracks. With our experience and many years of operation, we offer low-cost solutions that retain the standards in quality of our audio products and meet your needs in a user-friendly way that helps you to remain competitive in your industry.",
        "Companies with automated calls to customers or responses need audio for their calls. We produce audio tracks to be used in the various needs of the company, either in telephone calls or waiting audio messages in call center menus. Our audio voices avoid being robotic and have a human feel to them. We continuously strive to be the best solution for our clients and partner with them to come up with better standards and solutions that are scalable and help our clients improve their profitability by reducing employee overheads and enhance their operations.",
        "Large companies with vast operation premises or production facilities use voice instructions via public address means to issue instructions to staff. There are others who use voice updates to inform workers in one section of the industrial complex of what is happening in other sections of the complex so that they get ready to carry out their duties. Whatever your needs are for audio products, Sidago is the partner of choice for high quality audio production.",
      ],
    },
    "/services/design-multimedia/": {
      eyebrow: "Design & Multimedia",
      title: "Design & Multimedia",
      summary:
        "Design and multimedia support covering technical design, illustration, print, voice, presentations, and creative production work for modern businesses.",
      paragraphs: [
        "Sidago has the success of our client companies in mind. We continuously seek to provide our customers with solutions that enable them to remain profitable in the modern business environment that changes as every single day passes. For those seeking solutions in design and multimedia, we offer solutions that are affordable and easy to implement in your company.",
        "We know that most of the design and multimedia needs of our clients are for advertising purposes, thus we've developed solutions and methods to keep information about our customers flowing. We embrace both technological and other manual conventional methods in our endeavors to provide the highest quality solutions for the needs of your company. We also come up with hybrid procedures that embrace both the norms and the new trends of the industry to keep you in line with the best practices of this modern day and age.",
      ],
      sections: [
        {
          title: "In our design and multimedia solutions, we offer you services such as:",
        },
        {
          title: "Engineering/Technical Design Solutions",
          body: "We have teams of professional designers who have experience in technical designing. These teams are able to come up with different solutions to solve your engineering problems. We are also well equipped to draw the designs of your engineering inventions and create models for easier understanding during presentations.",
        },
        {
          title: "Illustration",
          body: "In illustration, we have artists who will sit with you and fully understand your ideas and what you want. They will then come up with hand-drawn designs that are transferred to digital platforms for ease of use. These can then be used in animations or in caricatures for your advertising and marketing needs.",
        },
        {
          title: "Print design",
          body: "Print design encompasses many different features of media production. Sidago helps you with the required design and even printing that you may need. We connect you with other production companies in the printing industry who are able to produce your designs in hard copy with astounding clarity.",
        },
        {
          title: "Voice talent",
          body: "Our unique hiring techniques and the large talent pool we can tap into enables us to recruit very talented speakers for all of your voice needs. These could be voice overs for your media productions or instructional voices for customer care. We are also able to develop scripts for the speakers to use in the making of voice recordings.",
        },
        {
          title: "Presentations",
          body: "In presentations, Sidago Integrated Solutions helps you prepare for the presentation adequately. This includes developing the protocols in your company and ensuring that you adhere to the procedures set by other people you may be presenting to. We see to it that you and your staff are ready to do the required presentations in a confident manner and prepare scripts depicting different scenarios that may arise and how to respond to each.",
        },
      ],
      closing:
        "In addition to the above services we also provide 3D modeling, animations, audio production, graphic design, logo design and video production services from our expert teams of developers, graphic designers, animators and video editors.",
      closingHref: "/contact",
    },
    "/services/engineering-technical-design/": {
      eyebrow: "Design & Multimedia",
      title: "Engineering/ Technical Design",
      summary:
        "Technical design support for engineering concepts, product illustrations, models, and iterative development work from idea through presentation.",
      paragraphs: [
        "Engineering companies and firms that are in the technical design industry often require illustrations of their innovations and how they work. Sidago has the unique capacity to serve their needs pertaining to the development of the models and diagrams they need. We come up with the required designs in the inception stages and work with you until your new innovation is complete and to your liking. With our design illustrations and models, you're able to evaluate the progress of your designs and see the progress that you're making.",
        "In conception, we help you prepare the designs of the engineering and technical innovations that you come up with. We do this by taking our time to listen to your needs and analyze the suitability of your proposed idea to the problem you hope to solve. We then prepare detailed illustrations and models of what you plan to create. It is with such diagrams that have technical details that you're able to easily see the shortcomings of your innovation and solve them.",
        "We also work in tandem with you as you develop the idea and create realistic models as you progress with the innovation. Our team of technical designers ensures that you have workable designs that are efficient in carrying out the tasks they are expected to undertake. We have frequent consultation sessions with you to keep the idea in line and see to it that you do not deviate from what you originally set out to do.",
        "Sidago is prepared to go with you all the way in seeing your ideas as they take shape into a product that you can present to your customer.",
      ],
      closing: "Schedule your free initial consultation today!",
    },
    "/services/graphics-design/": {
      eyebrow: "Design & Multimedia",
      title: "Graphics Design",
      summary:
        "Graphic design services for campaigns, branding, print collateral, and visual identity work shaped around the changing needs of growing businesses.",
      paragraphs: [
        "Is your company graphic intensive? For most companies, being presented with the question of how graphic intensive they are results in an unsure answer. Most companies rely on high quality graphics and need frequent services of graphic designers. At Sidago, we have a complete range of graphic design solutions for your business. We understand that your company has different levels of graphics use in intensity, depending on the different periods and transitions you go through. During advertising and marketing campaigns, you will require more graphics work than any other time. Our graphic design solutions are developed with your company in mind and your goals are what guide us in coming up with the designs that are sure to help you achieve success.",
        "Sidago has a team of very competent and professional graphic designers who are always at hand and willing to do everything they can to see that you have the most suitable graphic designs for your company. Our team has had years of experience and is well-versed with the current trends and preferences of various markets.",
        "We're able to produce designs for advertising campaigns such as banners, leaflets, brochures, posters, and branding of promotional material such as t-shirts. We will additionally link you with our partner printers so that the solution we give you is a complete one. These partner printers and suppliers of Sidago are trusted companies who we have worked with us and our clients over a long period of time and are known for their delivery of high quality results.",
        "In our uniquely developed business solutions, we cannot forget your need to brand yourself. Any company needs a unique identifying mark for their corporate use. This needs to be in the colors that are easily recognizable to their customers and the logos they use. We develop logos for our clients and help them decide the corporate colors that they'll use. We embrace the diversity and the challenge brought on by different companies seeking our services.",
        "Every opportunity you give us to serve you at Sidago is looked into uniquely and handled in a highly efficient manner that goes beyond satisfying your needs. We want the best for you, and the success of your company is of paramount importance to us.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/illustration/": {
      eyebrow: "Design & Multimedia",
      title: "Illustration",
      summary:
        "Illustration support for advertising, technical communication, digital media, and product storytelling where custom visuals need to match exact business goals.",
      paragraphs: [
        "Different companies have varying illustration needs depending upon the industry that they serve and the specific use for illustrations that they require. In illustration, we have specialists who will sit with you and fully understand your ideas and what you want to achieve. They will then come up with hand-drawn designs that are transferred to digital platforms for ease of use.",
        "Our illustrations have found use in various advertising and marketing campaigns of our clients over the past several years. These can be campaigns that utilize animations or caricatures for your advertising and marketing needs. The illustrations that we produce at Sidago are usable on various digital platforms to make your printing and animation tasks as easy to accomplish as possible.",
        "Another area where we produce illustrations is in the drawing of technical details pertaining to your company product designs. There are products that may need to be marketed or presented to potential buyers along with their designs and manuals for use. Sidago has got you covered.",
        "Our illustrational know-how and expertise can't work alone and it needs to be supported with proper understanding of your needs. You can be sure to be consulted in every step of the development process. This allows you to be informed of the progress and ensures that we come up with illustrations that are in line with your needs.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/logo-design/": {
      eyebrow: "Design & Multimedia",
      title: "Logo Design",
      summary:
        "Logo design services focused on recognizability, brand identity, practical usage across formats, and secure handling of company design assets.",
      paragraphs: [
        "Does your company have a logo? How easily identifiable is your logo? What colors have you used on your logo? These and many other parameters determine the suitability of your logo for your company. A logo is a unique identifying mark or symbol that can be associated with your company. A good logo is the first step towards successfully branding your company.",
        "At Sidago, we ensure that you get the best out of your logo design(s). You will have a professional and highly qualified team of experts at your disposal who are known for designing logos for all sizes of companies, yes, even leading brands. There is something that many business companies are afraid of, the leaking of their trade secrets and other company related issues. At Sidago, discretion is our second virtue after quality and we assure you that your designs and logo samples are secure with us.",
        "We develop unique logos for our customer companies and assist them in deciding the best placement of the logos on their products. These logos can be used in advertisements to brand products and sell the company's offerings to its target market. Your logo will be a simple mark that tells everyone that you are present when they see it. Our logos are presented to you in more than four different image formats for use on various technological platforms. We do not want to give you a product that will cause you headaches and have you looking for a re-design.",
        "If you're considering having a visual advertising campaign or marketing your goods using visual aids that may require the use of video, Sidago has you covered. Our logo development team has experts in media production as well as animation. These experts can develop excellent and captivating animated videos of your logo being formed. The videos are in various formats for easy use by your other advertising/marketing partners as well as your own use.",
        "In addition to developing your logo, we also offer repository services. In companies, misplacing the original designs of your logos is a very saddening event. We do not want you to have to copy your logo from somewhere if the soft copies are lost. We will keep the original soft copy of your logo for you in the event that you need it at a later date. Sidago is your preferred stop when you want your company logo developed. Your logo is your corporate marker and you need the best for such a task that is an important and integral of your company.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/presentations/": {
      eyebrow: "Design & Multimedia",
      title: "Presentations",
      summary:
        "Presentation support for internal and external meetings, rehearsals, slide preparation, and delivery readiness when communication needs to be precise.",
      paragraphs: [
        "Every company will be required at one time or another to hold a presentation. This could be to investors or an internal presentation within the company. You may also have an external partner come to present something such as a proposal or business plan to you. Sidago gives you business solutions that are suited for you, whether you're the host of a presentation or presenting to other people. We work with your staff and communications personnel to ensure that you're adequately prepared.",
        "We help you in the preparations for hosting the presentation, setting up the equipment, and proofing the presentation in advance. This gives you a feel of how the presentation itself will be. You will also be sure that everything is set for the presentation day.",
        "Our speech and presentation experts at Sidago take you and your staff through the rehearsals of the presentation. We go through a comprehensive checklist of what you need, from diagrams to illustrations and pointers. These rehearsals are important in identifying any items left out while avoiding rushing around as the presentation is taking place.",
      ],
      sections: [
        {
          title: "Preparation of slides and other material necessary for the presentation",
          body: "We help you to prepare the required presentation slides and go through the motions required for a successful presentation. In such simulated presentations, we get to know the areas that will need illustrations, models, and diagrams. Our teams in other departments get into seeing that these aids to your presentation are prepared on time and available ready for the presentation day.",
        },
      ],
      closing:
        "Sidago is ready to help you prepare for all your presentations. Reach out to us today for your free consultation!",
    },
    "/services/print-design/": {
      eyebrow: "Design & Multimedia",
      title: "Print Design",
      summary:
        "Print design services that cover layout, production-ready preparation, proofreading, and coordination with trusted printers for final delivery.",
      paragraphs: [
        "Print design serves many areas of your company that needs printed material. Print design incorporates many areas and encompasses many different features of your company's media production requirements. Sidago will serve you with high quality services in the process of print design up to the actual printing itself.",
        "We ensure that the material you want printed is developed in an appropriate manner and will serve your needs whether they're instructional, advertising, marketing, or training needs. There are materials for company use that may seem simple to make but are important to ensure the proper functioning of your company. These include customized booklets for use in record keeping, receipts, and communicational material such as memos.",
        "We come up with templates that are based on the information that you want to communicate or the data you may want to capture with tools such as questionnaires and application forms. We then see that the material is properly designed before they're taken to printing, so that you get nothing but the best printed material. We also have proofreading and editing services so that your printed product does not fail in communicating your message.",
        "To satisfy your printing needs, Sidago connects you with professional printers who have am immense amount of expertise and experience in printing. These are companies that have served Sidago as well as our customers for years. These printers give you quality and proper clarity in the printed material that your company demands.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/ui-design/": {
      eyebrow: "Design & Multimedia",
      title: "UI Design",
      summary:
        "User interface design for multi-device websites and digital products where usability, audience expectations, and structured interaction matter.",
      paragraphs: [
        "Website development, especially designing the UI, has become challenging with the increasing use of internet on various devices like laptops, smart phones, and tablets. This is because now the user interface needs to be designed in such a way that it is interactive and easy-to-navigate for users of all devices. Generally you can't expect a website designed for a standard desktop screen to appear well on a smaller smart phone screen.",
        "Other than being compatible across multiple platforms, the UI must be relevant to the user's needs. Every website should target its expected visitors when designing an interface rather than going for a general one, and this is why our user interface design services are completely customized for each and every one of our clients.",
        "At Sidago, we believe in taking an analytical approach towards designing a user interface. First, we conduct thorough research on what your targeted audience expects from you. This is an important step as the purpose of a user interface is to allow the easiest interaction possible between you and your customer/visitor. Once we've gathered the necessary information, we'll compile a plan of action and present it to you. After approval is given, we'll start making magic.",
      ],
      closing: "Are you ready to discuss your user interface design needs with us?",
    },
    "/services/video-production/": {
      eyebrow: "Design & Multimedia",
      title: "Video Production",
      summary:
        "Video production services for advertising, training, presentations, internal communication, and promotional content across digital and traditional channels.",
      paragraphs: [
        "For your video needs, Sidago has uniquely tailored solutions that satisfy your needs in a model that will lead to cost-savings and improved workflow efficiency. We foster ethical practices in our video production for our esteemed clients. We provide video production services for a range of different needs, so you can rest assured that there's not any job that we can't take on.",
        "We have had several years of experience in video production for advertising, management, training, and promotional needs. We work with you every step of the way during the process of conception all the way developing/implementing the video content. The initial consultation that happens when you contact us helps us determine the type of video you may need and how it will be used. We follow this up with a general business review that enables us to evaluate the audience that you're targeting to ensure the video is presented in the most effective manner possible while fulfilling their needs.",
        "The videos we produce at Sidago have multiple uses in the process of reducing employee overhead, managing savings, increasing your company's competitiveness, and in enhancing the quality of your operations. We produce training videos for your company that will lead to better employee specialization and capacity building so that your company as better staff who are able to carry out their different functions with greater efficiency and professionalism. When you want to retrain employees before reassigning them to other sections or departments of your company, you can use our video training material that is produced with a focus on better management of human resource.",
        "Our advertising video productions and promotional videos are suitable for use on different platforms including mainstream media and on the internet. Diversification into the internet platform to carry advertisements in video has happened over the recent years and as such, we produce video that is suitable for both mainstream internet websites as well as social media. Your video requirements will be adequately addressed and solved for you by our professional team members within the video production department.",
        "For project presentations and other management purposes, we produce videos that meet your needs in terms of passing information off to your audience. Important events in your company should not also go unrecorded and we provide video recording services for company trainings, parties, conferences, and other major events. We save your costs by having reasonably priced services and a wide network of professional partners who we can call on to assist us whenever they're needed.",
        "Our video production solutions are scalable and measurable. We seek to produce solutions that help you improve your client base and propose action plans that are workable for your company. They're easy to implement and improve the overall efficiency and effectiveness of your company.",
      ],
      closing: "Schedule your free consultation today!",
    },
    "/services/voice-talent/": {
      eyebrow: "Design & Multimedia",
      title: "Voice Talent",
      summary:
        "Voice talent services for voiceovers, advertising, customer care, automated systems, training, and company communications with support for hiring and training.",
      paragraphs: [
        "Voice talent is a much sought-after resource by many companies. Sidago understands that you need the perfect voices to be the trademark that sells you to your customers in the market during your communications. Companies need voice talent for varying uses such as voiceovers for advertisements and marketing campaigns, automated customer care services, instructions in offices, and your company training material. We serve these and any other needs that you may have for voice talent in a solution-oriented process that's governed by the unique needs of your company.",
      ],
      sections: [
        {
          title: "Hiring Services",
          body: "Our unique personnel hiring techniques and the large talent pool from our countries of operation ensures that we can tap into highly talented speakers for all of your company's voice talent needs. We develop scripts for use by the speakers in the making of your company voice recordings. Our voice talent services team at Sidago Integrated Solutions ensures that your voice needs are taken care of in the best manner possible.",
        },
        {
          title: "Training Services",
          body: "We have Voice Talent Trainers at Sidago who can be provided to you in various capacities to train your staff. The way your staff communicates with your customers is important to you and we provide the means of training your staff to communicate adequately with them in the most professional manner possible.\n\nThere are voice characteristics such as the tone and inflections in communication that convey unique messages and can attract customers to your products as they are being marketed by your staff. This requires that the salesperson use language and voice projection that is attractive and easily identifiable with. We offer both embedded personnel to train your staff and training sessions with professionals. You have a wide range of choices at Sidago to pick from when you are faced with voice talent needs and we ensure that you get the best.",
        },
      ],
      closing:
        "Are you ready to find out why we're the premier voice talent provider? GET IN TOUCH TODAY!",
    },
    "/services/web-design/": {
      eyebrow: "Design & Multimedia",
      title: "Web Design",
      summary:
        "Web design services for custom builds and redesigns that improve presentation, communicate the right message, and support stronger conversion outcomes.",
      paragraphs: [
        "In general, website design is the term used to refer to the interface and graphics displayed at the user-end. However, it's closely related to graphics designing, coding, and markup language, which are all used in the design process. Web design plays a vital role in presenting your business ideas the way that you intend to. It helps convey your actual message to your targeted audience in a way that not only attracts you huge traffic, but also increases conversion rates.",
        "Even if your website isn't for business purposes, the design still matters in attracting visitors and getting high ranks within the SERPs. Examples of such non-business websites includes blogs and forums which are solely made for discussion and connectivity.",
        "Web design is among the key services we provide. Whether you want a fully customized website meeting your organization's requirements, or you want to redesign your current website and make improvements, we can help you either way. Contact us today for your free web design consultation.",
      ],
    },
    "/services/business-services/": {
      eyebrow: "Business Services",
      title: "Business Services",
      summary:
        "Business services support for companies that need practical operational systems, specialist execution, and adaptable service models across core business functions.",
      paragraphs: [
        "We realize that your company has different needs when it comes to professional business services. These could range from hiring to the general necessities needed for the operation of your company. The unique set up of any individual organization and the way each organization comes up with its own protocols within the workplace requires unique solutions, which we're more than capable of providing.",
        "Sidago recognizes the nature of your company setup and works with you to come up with tools and procedures that allow you to deliver better services to your customers. Our methods of service delivery ensure that your products are of the highest quality. We also embrace technology and take it upon ourselves to see to it that you have the best technical platform integrated to enable your company to reap the benefits of staying modernized as times change.",
        "Here are a few of our most popular business services. Remember, if you don't see what you need here, that doesn't mean we can't provide it. We have a large team that's situated globally which allows us to provide our clients with complete business solutions. Just reach out to us today to schedule your consultation and see how you can put the Sidago team to work for you.",
      ],
      sections: [
        {
          title: "Back Office Solutions",
          body: "We have back office operations specialists who are at hand to advise/assist your back office operations and provide management tools to make everything in the back office seamless, yet efficient.",
        },
        {
          title: "Business consulting",
          body: "We provide full-service consultancy solutions for all types of businesses around the world. Our highly experienced business consultants have the knowledge and experience needed to enable priceless solutions to the demands of your company and its customers of course.",
        },
        {
          title: "Legal",
          body: "We have assistance available to help you with your legal issues. These could be matters relating to patents, copyrights, and intellectual property rights for your innovations. We also take care of your other day-to-day legal issues and offer legal advice to guide your interactions as well as business activities.",
        },
        {
          title: "Payment Processing",
          body: "We help you with a wide array payment processing methods which ensures timely delivery and prompt release of funds to your employees as well as your company when we're also handling payments from your clients/customers. This includes computerized payment processing programs that ensures accuracy in tracking the amounts. We also have solutions for day-to-day payments and petty cash management.",
        },
        {
          title: "Project Management",
          body: "We are there to help you with the management of your projects and see to it that the projects are successfully implemented. Your goals for the project become accomplish within your budget and by the time your deadline hits. We also ensure that the quality of the project is within the set standards, if not higher.",
        },
        {
          title: "Recruiting",
          body: "Sidago Integrated Solutions is a professional recruiter and seeks to get the best staff for your company. We work with your human resource personnel to ensure that the vision of your company is upheld at all times while being transferred to your customers through your employees. Say goodbye to hours of interview, training, and hiring when you allow Sidago to find the best employees for you.",
        },
        {
          title: "Relationship Management",
          body: "Our public and business relations department sees to it that your company is well presented to the public and helps you in acquiring new business partners. Whether you're combating negative SEO or just need constant social media monitoring, we assist in all aspects of online as well as offline relationship management.",
        },
        {
          title: "Statistical Analysis",
          body: "Sidago Integrated Solutions is able to assist you in performing statistical analysis for your company. You need to take surveys and analyze the operations of your business including costs and income. We help you make sense of collected data and generate reports that help you to easily understand the progress in your company.",
        },
      ],
      closing:
        "Are you ready to put Sidago to work for you? GET STARTED TODAY!",
    },
    "/services/accounting/": {
      eyebrow: "Business Services",
      title: "Accounting",
      summary:
        "Accounting services for companies that need dependable financial records, payroll support, statements, tax handling, and stronger office efficiency.",
      paragraphs: [
        "Are you starting a new business or is your existing business giving you headaches with bookkeeping? You need a way to keep your overheads low while ensuring that your company produces the needed output to continue expanding its operations. This is where Sidago can come in and help make it easier than it has ever been before!",
      ],
      sections: [
        {
          title: "We bring the experience to the table.",
          body: "We are an established accounting firm with several years of experience, and you can hire us for a wide array of accounting services which includes, but is not limited to:",
        },
        {
          title: "General Accounting",
          body: "Your fiscal records have the information that you require to know the value and status of your business. We will make concise records that shows all of your earnings, assets, equity, and liabilities in every quarter of each financial year.",
        },
        {
          title: "Payroll Processing",
          body: "Payroll and its taxes will affect the net income of your company. We process the payrolls based on state laws and regulations to ensure that your company remains relevant by staying in compliance with the appropriate taxation authorities.",
        },
        {
          title: "Preparation of Financial Statements",
          body: "You have to know exactly what the numbers of your business activities means. We'll compile a robust statement to show you the progress of your work. These statements help you be as efficient as possible in this aspect of your business operations. We'll always ensure that we prepare the statements accurately and meet delivery deadlines.",
        },
        {
          title: "Tax Returns",
          body: "Whether your company is a sole proprietorship or a limited liability company, we'll help you will all the services that covers all aspects taxation. Filing tax returns is almost always a complicated procedure for business owners. We can relieve you from the burden and handle the procedure professionally while taking advantage of tax breaks where possible.",
        },
      ],
      closing:
        "Allow us to handle your accounting needs while improving your office performance and productivity. Our services will assist your business in reducing unnecessary expenses that may arise from mishaps in low quality accounting practices. We're proud to have an extensive tax record in dealing with some of the most complex accounting tasks, so whether you're just a startup or a large brand, Sidago has the resources and knowledge needed to help you get the most from the finance arm of your business. Contact us today!",
    },
    "/services/bookkeeping/": {
      eyebrow: "Business Services",
      title: "Bookkeeping",
      summary:
        "Bookkeeping services for business owners who need accurate financial records, clear reporting, and flexible support without adding office overhead.",
      paragraphs: [
        "We know your business is just as important as your family and this is why we want you to sit back and allow us to assist you with your bookkeeping allowing you to spend more of your time on what matters the most in your life, your family. We have experienced professionals who will inform you about the profit you make while keeping an accurate record of your money, the people you are indebted to as well as the amount of taxes that you're required to remit.",
        "We'll ensure that your business accounting and financial transactions are updated and accurate. We know that your business requires timely reports in order to evaluate its performance and the rate of growth which is why we've dedicated an immense amount of time, resources, and money to provide our customers with an off-site back office solution.",
      ],
      sections: [
        {
          title: "What We Do",
          body: "We'll help you process all of your transactions and compile a comprehensive financial report that's easy to understand and share with your team. A timely report is vital in determining the performance and status of your business. This also helps in proper management of the business because you'll be aware of the areas that need to be improved and those that are doing great as expected.\n\nFrom the experience we've gained over the years we understand that business owners require simplified but complete financial reports and that's exactly what we offer you. We do this while maintaining highly competitive pricing so that you don't have to spend an arm and a leg to give your business the attention that it deserves. Here's a sample of our accounting related services.",
          bullets: [
            "Accounting Software Integration",
            "Bank/Credit Card Reconciliation",
            "Employee Payroll",
            "Inventory Control",
            "Invoicing",
            "Manual Bookkeeping",
          ],
        },
        {
          title: "Flexibility of Our Operations",
          body: "Bookkeeping will at some point interrupt the operations of your business. We will therefore offer you flexibility in choosing when we can come and serve you. Why burden yourself with all your bookkeeping, office arrangements, and deadlines? Enjoy the peace of mind and focus on the important front office operations that steer your business while we deliver robust reports and a modernized back office solution.",
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/back-office-solutions/": {
      eyebrow: "Business Services",
      title: "Back Office Solutions",
      summary:
        "Back office solutions that streamline internal operations with better tools, faster execution, and structures tailored to how each organization actually works.",
      paragraphs: [
        "Our back office operations specialists are always at hand and ready to lend their services to your company as you seek to streamline operations. We provide your company with various management tools for your operations such as bookkeeping, administration, systems maintenance, settlements, and general accounting.",
        "We have technical solutions to fulfill your back office needs. We ensure that in the modern business environment the activities that are needed to be done are done as fast as possible and with great accuracy. Sidago comes up with solutions that integrate easily with your existing system.",
        "Sidago also recognizes that your business workplace is unique in its setting and in the way you go about your tasks. Therefore, we take the time to study your company operations and come up with unique solutions that fit into your company while reducing your overhead. We're also able to help you decide how to departmentalize and how many employees are truly necessary for each department.",
        "The uniqueness of each institution requires unique solutions that are suitable and specifically modeled around the needs of the institution. We recognize this and we are constantly developing new solutions to ensure that our customers are only provided with the best.",
      ],
      closing:
        "Get in touch with us today to discuss streamlining your back office operations.",
    },
    "/services/business-consulting/": {
      eyebrow: "Business Services",
      title: "Business Consulting",
      summary:
        "Business consulting services for companies that need operational advice, startup guidance, legal coordination, and practical recommendations for sustainable growth.",
      paragraphs: [
        "We provide consultancy services for all the types of businesses and company operations. There are various issues that you may require advice with. We partner with experienced companies and other professionals to provide you with sound legal advice and processes for operations that help your ventures to succeed.",
        "Legal advice is one area where we provide a lot of assistance to our clients. We also connect you with other organizations with whom you can work to see the success of your business operations. These could be in the sourcing of raw materials and other supplies for your company or exploration of marketing channels. We have extensive experience in the start-up stage as well as general operation which enables us to provide you with the best business consulting services around.",
        "The daily operations of your company may lead to losses that can be avoided. We listen to you, evaluate your business practices, and advise you on any changes that could be made to lower the company's overhead. Sidago Integrated Solutions also offers advice on what you need to do to setup your business, operate it successfully, and be in legal compliance. We also show you the channels that you could use to successfully advertise your products and services with ease and maximum saturation.",
        "Our professional services have allowed us to be involved in many business deals as consultants and we've provided invaluable advice to different companies and businesses of all sizes. Our business consultancy teams have seen many of our clients' companies succeed. Sidago provides businesses with consultancy services that help them attain success.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/financial-services-planning/": {
      eyebrow: "Business Services",
      title: "Financial Services & Planning",
      summary:
        "Financial planning services for business owners and investors who need clearer goals, stronger monitoring, and practical recommendations over time.",
      paragraphs: [
        "Starting a business can appear to be easy when we have the money to invest, but it can be a difficult journey if one does not know how to manage the investment properly, yet efficiently. Initial planning can be simple but striking a good plan that will see the amount of the invested money spent in the right way will require professionalism.",
      ],
      sections: [
        {
          title: "Trust Our Team of professionals",
          body: "We have a team of qualified and experienced financial planners who can help you deal with that challenge and emerge a successful investor. They will help you come up with clear goals and show you exactly how you can achieve them. When you need a clear roadmap, Sidago is here to provide you with exactly that.",
        },
        {
          title: "We're here for the long haul!",
          body: "Our services do not end at helping you set your goals. We'll be with you throughout the whole process to ensure that you stay on track in every aspect of the operation. We know sticking to the plans that you make can be challenging when you're left alone. Just relax and let us guide you along the way while assisting you in making changes to the areas that may be slowing you down.\n\nOur experts can assist you with:",
          bullets: [
            "Checking the status your income, current assets, expenses, and liabilities. If the records are balanced, then you're definitely on the track to success. However, if something isn't right then we'll help you fix it immediately.",
            "We will prepare a clear report to help you easily understand the current status of your investment(s).",
            "After our assessment, we'll provide recommendations of the things the can be done in a better way to help improve your overall performance.",
            "We'll keep monitoring your progress as time goes by, and assist you in any changes needed due to a change in circumstances.",
          ],
        },
      ],
      closing:
        "If you're ready to get your investments earning you an even higher return, contact one of our professional financial planners today. We can't wait to help you see that the grass is even more greener on the other side!",
    },
    "/services/legal-assistance/": {
      eyebrow: "Business Services",
      title: "Legal Assistance",
      summary:
        "Legal assistance for contracts, partnerships, compliance, and day-to-day business matters where companies need practical support and trusted guidance.",
      paragraphs: [
        "At Sidago Integrated Solutions, we have solutions to help you with any legal matters that may arise. All companies have legal issues to look into that could range from matters pertaining to patents, copyrights, and intellectual property rights for your innovations. We also take care of your other day-to-day legal issues and offer legal advice to guide your interactions and business activities.",
        "A commonly assumed area that requires proper legal advice is in the drafting of partnership agreements when getting into ventures or projects with partner organizations. The projects could be short-term or long-term but they all need proper legal documentation if you are to realize the full benefits of partnering with other companies and businesses.",
        "Here are the two main arms of Sidago's legal services.",
      ],
      sections: [
        {
          title: "Contracts",
          bullets: [
            "When entering into contracts, we ensure that you have the best legal advice available and are represented adequately in the process of coming up with the contract documents.",
            "Partnerships can be tricky for companies to navigate. Sidago Integrated Solutions will advise you on how to get into a partnership and come up with the rules that will govern the partnership",
            "We can also assist you in the process of securing your intellectual property rights.",
          ],
        },
        {
          title: "Law of the land",
          bullets: [
            "Compliance with the law of the land where your business is based is often a difficult maze. We provide legal experts from Sidago Integrated Solutions and help you connect with local and international legal professionals who ensure that your company is fully compliant.",
            "Sidago Integrated Solutions also helps you with the legal issues that may come up when your company is sued and during drafting of user agreements for your products and services.",
          ],
        },
      ],
      closing:
        "Sidago remains your preferred legal partner in providing legal compliance solutions.",
      closingHref: "/contact",
    },
    "/services/recruiting/": {
      eyebrow: "Business Services",
      title: "Recruiting",
      summary:
        "Recruiting services for companies that need stronger shortlisting, structured interviews, and hiring support tailored to role requirements and culture fit.",
      paragraphs: [
        "Sidago has well-developed and highly advanced procedures for recruitment. We have a large talent pool to tap into since we operate in more than 10 countries and have recruited for hundreds of companies and businesses in a variety of industries. We have the expertise and the experience to ensure that we get nothing but best staff for your company. We also work with your human resource management team to ensure that the people we recruit for you are the most suitable for the needs of your company.",
        "Our first step in the process of hiring for you is carrying out a comprehensive consultation with your HR department or managers overseeing this area. We also invite the heads of the departments where the new employees will be working to share their thoughts on the best candidate for the job. At Sidago, we believe that a proper understanding of the type of person being sought is vital to successful recruitment.",
        "We ensure that the job openings in your company are advertised on the best job boards and via the most solid media outlets tailored to the audience that you seek to hire from. We then collect the job applications that you receive and do the necessary short-listing as dictated by the volumes of applications we receive. We ensure maximum penetration of information to prospective applicants so that we get a large pool of people to choose from.",
        "After we have shortlisted, we then sit in a panel with your human resource managers and conduct interviews. We have professional panelists who have gained experience in seeking out the best employees for our client's companies. They're able to evaluate the personalities of the interviewees and determine if they're suitable for your company's work environment. We look for team players who exhibit leadership qualities for the continued success of your company.",
        "Our process of hiring takes into consideration the interviewee's decisiveness and adaptability. We also carry out other recruitment tasks that happen after interviewing until the time the employee is formally employed by your company or as part of our team if that's the setup that our client desires. Each solution is customized for each specific company to ensure the best output possible.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/statistical-analysis/": {
      eyebrow: "Business Services",
      title: "Statistical Analysis",
      summary:
        "Statistical analysis services for surveys, operational data, profitability questions, and management reporting where better interpretation improves decisions.",
      paragraphs: [
        "Sidago Integrated Solutions has been involved in many types of statistical studies and analysis of data over our years of doing business. We've gained invaluable experience in doing statistical analysis of factors involved in production and business success. We have a team of expert analysts who have studied different methods of statistical analysis and who have participated in many analytical undertakings. Sidago ensures that our experts are kept abreast with the latest methods that are recommended for the investigative studies to be certain that your company gets the best by working with us.",
        "Companies need to carry out surveys and collect different types of data. This could be related or unrelated data. We help you do the analysis that you need to determine of the profitability of your company. Sidago Integrated Solutions takes into consideration the need for surveys to be low-cost and to collect reliable data of the right volumes to be useful. Our team of analysts comes up with the best tool that will fit the survey to be carried out and determine the best sample size for the survey.",
        "A good survey carried out scientifically by our team of analysts gives you comprehensive insights into the workings of your company and the viability of your procedures and business operations. We also generate reports using the collected data so that it's easier for you to understand the findings and have a firmer grip on the future of your company.",
        "For all your company's statistical analysis needs, Sidago Integrated Solutions has the capacity to study the problem and come up with appropriate methods and solutions to carry out the required tasks to enable you have a better understanding of issues in your company and easily point to options that can be followed for better profitability.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/translation/": {
      eyebrow: "Business Services",
      title: "Translation",
      summary:
        "Translation services for multilingual operations, local market communication, international business material, and audio or video language adaptation.",
      paragraphs: [
        "Translation services are an integral need for companies that have their operations different regions. Not all places use the international languages and some companies that work with people living in remote places need to have their communications translated into local languages. Other companies need the material in one international language translated into another international language for example from English to French, or from German to Russian.",
        "Sidago has the capacity to provide translation services for your company at the most affordable prices, while making it easier for HR management and increasing efficiency within your company. We empower you to communicate adequately with your clientele and partners so that you don't lose out on crucial business deals or sales. We have a selection of translation services for you to choose from. With operations in more than ten countries, we're perfectly placed as a premier provider of translation services.",
        "Conventional translation services include translating written content, audio materials, and doing video translation. Video translation is where a video is recorded in one language and we have our translator pass the same message using the image track of your original video but the voice is in another language. Our translator will translate what the characters in the original video are saying. This retains the confidence of people who are watching the video since they see familiar faces, it is only the language spoken that varies.",
        "Again, complete discretion is exercised at Sidago. The privacy of our clients is strictly respected at Sidago and you can safely trust us with your sensitive communication that needs translation. Sidago remains the preferred partner in providing translation services by many leading brands, and you can be sure to be attended to in a satisfying and solution-oriented manner.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    },
    "/services/customer-service/": {
      eyebrow: "Business Services",
      title: "Customer Service",
      summary:
        "Customer service support focused on stronger rapport, better issue handling, and more consistent communication across channels and customer segments.",
      paragraphs: [
        "It's no secret that good customer service can go a long way in building your business. In fact, not only does it play a major role in its success, but it can also be considered the lifeblood of any organization. Providing quality customer care can build up your reputation, as it is an important factor in fulfilling your customers' needs. Simply put, a company won't be able to survive without enhancing this part of their business, because failing to do so could damage its reputation.",
      ],
      sections: [
        {
          title: "Rules of Good Customer Service",
          body: "Building a strong reputation and gaining loyal customers should be the goal of any company no matter how big or how small. That's why it's important to treat them as if they really matter. Some have argued that many companies have fallen short in this regard, and that it is especially true with large corporations. As companies get larger, it's easy for someone to get lost in the endless sea of policies and procedures that can sometimes get in the way of fulfilling his or her needs. It can be easy to think that, because they have millions of customers worldwide, that losing one won't make a difference. But the truth is that failing to satisfy one customer can start a chain reaction that could eventually destroy your business. That's why it's important to treat every customer as if they really matter.\n\nUnderstanding and anticipating your customers' needs can go a long way in building your reputation. So, it's important to make sure you're giving them the right information, but everyone knows that mistakes will be made from time to time. Sometimes the wrong information will be given, or you might have a new employee who doesn't have the correct information. The important thing to do in this situation is to be apologetic, and go out of your way to rectify the situation. Customers will appreciate it, because a sincere apology can go a long way in making them feel important.",
        },
        {
          title: "Why Choose Sidago Customer Service?",
          body: "At Sidago Integrated Solutions, we understand that satisfying the needs of buyers is an essential part of creating a positive customer experience. Focusing on this part of your business will not only enhance your reputation, but it will also keep your customers loyal to you. This is, after all, the goal of any corporation, because without it they would be unable to survive in today's marketplace.\n\nWe can help you achieve these goals by:",
          bullets: [
            "Ensuring that your customers are satisfied with the services we provide, and that they will voluntarily promote your brand within their own social circle, family, friends, and other people they may know.",
            "Making sure our representatives are always available to address your customers' concerns.",
            "Making our services accessible, and offering an effective means of communication whether it's over the phone, by email, or over social media channels. And our bilingual staff will help to overcome any language or cultural barriers.",
          ],
        },
      ],
      closing: "Contact us today to find out what we can do for you!",
    },
    "/services/data-science-analysis/": {
      eyebrow: "Business Services",
      title: "Data Science And Analysis",
      summary:
        "Data science and analysis services for businesses that want clearer operational insight, faster decision support, and practical use of large information sets.",
      paragraphs: [
        "We are living in a golden age for marketing, with more and clearer insights into customer's behaviors and interests. In fact, handle your marketing right and people will even look forward to your advertising! But that requires know what they want, and how best to give it to them. Which requires knowing how to derive actionable insights from the endless string of numbers flowing out of countless devices. Even the most small-time marketer is expected to be a data analyst these days, which is part of what makes data science and analysis so in demand, currently.",
        "Big Data has been a buzzword for some time, but despite that fact, not many know how to capitalize on its secrets. With Big Data, and the insights that can be derived from data science and analysis it becomes possible to make business decisions in real time which will put you three months ahead of the competition who are relying on quarterly reports.",
        "Data scientists try to give operational insights into issues that are invisible to the layperson. A data analyst quantitatively depicts the primary elements of an accumulation of data.",
      ],
      sections: [
        {
          title: "Why Data Science & Analytics Are Needed",
          body: "The proliferation in the amount and different types of data has created information sets that are not reasonable in size for administration to analyze themselves.\n\nTo deal with these new and conceivably significant information sets, new techniques for information science and new applications as prescient examination have been produced. Data is generally thought to be a driver of better choice making and enhanced productivity, and this observation has some evidence to back it up.\n\nData scientists and data analysts, connect with numerous parts of an organization from designing to business insight and item administrators. The roles of information researchers and information investigators are to a great extent unclear and differ by your own aptitude set and the organization's requirements.",
        },
        {
          title: "Ten Practical Applications Of Data Science And Analysis For Business",
          bullets: [
            "Dialogue with consumers: Consumers today are difficult. They research endlessly, talk to their entire social network about their purchases, demand to be treated as unique while wanting to be sincerely thanked for buying your products.",
            "Re-develop your products: Big Data can also help you understand how others perceive your products so that you can adapt them, or your marketing",
            "Perform risk analysis:Big Data can help to provide analytics for prediction by analyzing newspaper reports and social media networks to keep you permanently up to speed on the latest developments in your industry.",
            "Keeping your data safe",
            "Create new revenue streams",
            "Customize your website in real time",
            "Reducing maintenance costs",
            "Offering tailored healthcare",
            "Offering enterprise-wide insights",
            "Making our cities smarter",
          ],
        },
        {
          title: "Sidago Data Science & Analytics Services:",
          body: "Sidago data scientists and data analysts have a strong background in software engineering, data visualization, insights, investigation, math and solid business sense. These qualifications are combined with the capacity to convey discoveries to both, business and IT pioneers, in a manner that can impact an association's approach to a business challenge.\n\nOur team can help you assemble data or supplement a major data analysis group to concentrate on the information you need.",
        },
      ],
      closing:
        "Please feel free to contact us for any further inquiries and assistance today!",
    },
    "/services/paralegal-services/": {
      eyebrow: "Business Services",
      title: "Paralegal Services",
      summary:
        "Paralegal services for research, document handling, case support, and administrative legal work that helps attorneys and firms operate more effectively.",
      paragraphs: [
        "Behind every great attorney is an extraordinary paralegal. It's not just a quaint adage. It's a truth.",
        "Even the most humble law office is practically drowning in paperwork, e-mails that need to be returned, records that need to be updated and organized, and that's not even to mention keeping up with latest industry news and legal cases, that allows a great attorney to stay on top.",
        "None of this would be possible without the help of a good paralegal.",
      ],
      sections: [
        {
          title: "What Is A Paralegal?",
          body: "If you've not yet had the pleasure of working with a paralegal, they can represent considerable authority in specific sorts of law, for example, criminal, corporate, immigration and crew. Otherwise called lawful colleagues, paralegals' inclusion in cases relies upon their boss's watchfulness, but can work with a great deal of autonomy, at the same time.\n\nParalegals spend the majority of their time at work engaged in:",
          bullets: [
            "Case management: Coordinating every aspect of a case and making sure that appropriate steps are taken in a timely manner",
            "Handling correspondence.",
            "Putting deadlines on the calendar: Paralegals calculate deadlines for lawyers and file documents when necessary.",
            "Automating systems and using computerized support to help prepare for legal defense.",
            "Creating pleadings, writing out conduct discoveries and responses.",
            "Contacting and conferencing with clients.",
            "Analyzing and summarizing documents.",
            "Fact checking.",
            "Performing legal research.",
            "Attending to office matters",
          ],
        },
        {
          title: "Some of paralegals' main duties include",
          bullets: [
            "Case planning, development, and management;",
            "Legal research, fact gathering and information retrieval both via traditional systems such as libraries and computer-based research",
            "Interview clients and maintain contact with them, under the attorney's supervision",
            "Draft and analyze legal documents including pleadings, discovery requests and responses",
            "Draft and sign legal correspondence that is informative in nature but that does not include legal opinion or advice",
            "Prepare for and assist at trial",
            "Represent clients before a state or federal administrative agency if permitted by law",
            "Find and take deposition from witnesses",
            "Paralegals also create summaries of documents and proceedings including the depositions, interrogations and testimony",
            "Paralegals attend legal functions such as will executions, real estate closings, court or administrative hearings, depositions, as well as attending the trial with the attorney.",
          ],
        },
        {
          title: "Legal Research And Presentation",
          body: "Assisting attorneys in trial preparation is the most vital role of a paralegal. A large part of this consists of conducting legal research and gathering pertinent information to the case. Often, paralegals also are involved in preparing presentations for the client.",
        },
        {
          title: "Client Interviews",
          body: "Lengthy elaborate cases can involve hundreds of hours of interviews. While a paralegal usually does not conduct the initial client interview, they are present while it's happening, meaning they are prepared to conduct follow-up interviews.",
        },
        {
          title: "Drafting Legal Documents",
          body: "Drafting legal documents is one of the most important and time consuming aspects of a paralegal's job. This can include drafting correspondence and pleadings, such as subpoenas, complaints, interrogations, deposition notices, pretrial orders, and legal briefs with various parties.",
        },
        {
          title: "Sidago Paralegal Services:",
          body: "Sidago Paralegal Team permits law offices and organizations to enhance profitability, expand assets, and control costs. We recruit the best full-time expert law staff, at the top of their field. We provide services of our paralegal experts to transform an extensive variety of authoritative reports and court frames. To learn more about our services, please feel free to contact us.",
        },
      ],
    },
    "/services/technical-writing/": {
      eyebrow: "Business Services",
      title: "Technical Writing",
      summary:
        "Technical writing services for companies that need clear documentation, client guides, online help, and process material explained with precision.",
      paragraphs: [
        "Technical writing refers to the unmistakable, brief, and unambiguous presentation and investigation of exploratory or designing results. The role of this specialized writer is to investigate and clarify in straightforward language the advanced concepts that are troublesome to conceive for a normal reader. This commonly means making client guides, online help, and direction manuals, other preparing materials and procedure documentation. Hiring an experienced and well qualified technical writer offers you the following advantages:",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Communicating information more clearly;",
            "Concise, clear and complete documentation reduces cost;",
            "Creating good manuals reduces support costs of the companies.",
          ],
        },
        {
          title: "Need of Technical Writing",
          body: "Numerous items or administrations have mind boggling or specialized viewpoints that need to be imparted to the end client. Successfully convey these angles can be vital to the effective selection of the item or administration. It is the technical writer's obligation to impart these ideas to the end client. Some documentation is composed by the relevant field experts who made the item in the conviction that they comprehend the item best. This approach has a tendency to disregard the needs of the reader. The architects comprehend the working of an item, but they do not emphasize much on its application. Technical writer go about as client supporters and give a goal perspective. The significance of technical writer's work is not just found in the cash it serves to produce, but it is also found by the accommodation and wellbeing it makes for readers.",
        },
        {
          title: "Sidago Technical Writing Services",
          body: "Sidago technical writing administration group can make online help, establishment guides, fast begin guides, client documentation, and other specialized documents for your product organization. Your documentation will be created to impart viably to numerous groups of onlookers. Programming clients regularly go from tenderfoot to cutting edge so your technical writing must be composed to convey to an extensive variety of abilities and experience. By seeking our technical writing services, you can be sure that your customers are understanding your perspectives quite well.",
        },
      ],
      closing:
        "Please feel free to contact us for any further inquiries and assistance.",
    },
    "/services/software-developement/": {
      eyebrow: "Development & IT",
      title: "Software Development",
      summary:
        "Custom software development support built to align technology, business operations, and customer experience in one scalable platform.",
      paragraphs: [
        "Running a modern business successfully requires the right use of information technology across websites, order processing, quality assurance, customer interaction, and the broader systems that support daily operations. To manage all of that effectively, businesses need software that is properly aligned with how they actually work.",
        "In many cases, that means software designed specifically around your business model. Even when off-the-shelf tools are available, they often require adaptation before they truly fit operational needs, workflow expectations, and the level of customer interaction a growing business demands.",
        "As a full-service software development partner, we build software solutions that combine modern development methodologies with structured project execution. That approach helps reduce unnecessary complexity and development cost while making the best possible use of available budget, resources, and delivery timelines.",
        "Our team can support you across the full software lifecycle, from feasibility and prototyping to testing, refinement, and operational rollout. The goal is to deliver software that is useful in practice, easier to adopt, and durable enough to support long-term growth.",
        "We also help at specific stages of development when a full build is not required. If an organization is working with ready-made software that needs refinement, training support, or functional improvement, we can step in and improve the system so it becomes more practical for real business use.",
      ],
      sections: [
        {
          title: "Game Development",
          body: "Support for interactive software products with platform-specific execution, polished user experience, and production-focused delivery.",
        },
        {
          title: "Mobile Applications",
          body: "Native and mobile-first application development that improves customer access, communication, and service delivery across devices.",
        },
        {
          title: "Plug-In Development",
          body: "Targeted plugin solutions that extend the functionality of existing software without requiring a full rebuild.",
        },
        {
          title: "Project Management",
          body: "Structured delivery oversight that helps software projects stay aligned with scope, timelines, resource constraints, and business priorities.",
        },
        {
          title: "Quality Assurance",
          body: "Testing and validation support that helps refine software functionality, reduce risk, and improve readiness before release or scale-up.",
        },
      ],
      closing:
        "Whether you need a new bespoke platform or focused support improving existing software, we provide practical development capability that helps businesses operate with more clarity, efficiency, and confidence.",
    },
    "/services/server-administration/": {
      eyebrow: "Development & IT",
      title: "System Administration",
      summary:
        "Server and systems administration support built for stability, operational efficiency, and scalable business infrastructure.",
      paragraphs: [
        "Technology adoption in the business environment helps automate work, reduce manual overhead, and make day-to-day operations more efficient for both leadership teams and staff. Companies increasingly rely on server and systems infrastructure to manage communication, applications, and internal workflows in a more cost-effective way.",
        "For communication, management, and operational requirements, we provide practical server and systems administration solutions. That includes installation, configuration, ongoing administration, and embedded technical support where needed, so teams can work with more confidence and fewer operational disruptions.",
        "We also help organizations improve internal understanding of their systems through hands-on support and operational guidance. The goal is not only to keep infrastructure running, but to make it easier for your team to work with it reliably over time.",
      ],
      sections: [
        {
          title: "DNS Services",
          body: "We provide reliable domain name server solutions designed for redundancy, fast response times, and dependable availability across critical services.",
        },
        {
          title: "Email Servers",
          body: "We install, configure, and maintain email server environments for internal communication, client correspondence, and high-volume business messaging needs.",
        },
        {
          title: "Enterprise Solutions",
          body: "Our enterprise-grade administration support is tailored to your infrastructure requirements and integrates with core business systems to support long-term operational success.",
        },
        {
          title: "General System Administration",
          body: "We keep systems running through troubleshooting, routine maintenance, issue prevention, and structured remediation so recurring failures are reduced over time.",
        },
        {
          title: "Hosting Infrastructure",
          body: "We support modern hosting infrastructure for websites, communication systems, and server-based business platforms that require dependable performance.",
        },
        {
          title: "Server Scalability",
          body: "We assess your current environment, identify scale limitations, and implement practical improvements so infrastructure can grow with demand while meeting required thresholds.",
        },
        {
          title: "Technical Support",
          body: "Our technical teams resolve server and systems issues quickly, helping reduce downtime and ensuring operational problems do not remain unresolved.",
        },
      ],
      closing:
        "Additional support areas include LAMP system administration, Amazon AWS administration, reputation management, and search engine optimization, with solutions adapted to your operating environment.",
    },
  };

  return contentMap[href] ?? null;
}

function getIndustryDetailContent(href = "") {
  const contentMap = {
    "/industries/b2b-commercial": {
      eyebrow: "Industries",
      title: "B2B / Commercial",
      summary:
        "Go-to-market, channel, and revenue execution support for commercial organizations building repeatable growth.",
      paragraphs: [
        "Commercial organizations need more than broad strategy. They need execution systems that connect market opportunity, sales activity, partner alignment, and operational follow-through in a way that can scale.",
        "Our B2B commercial support is built for teams improving how they reach buyers, structure revenue operations, and coordinate commercial execution across internal and external stakeholders.",
        "From planning through implementation, we help commercial teams improve consistency, visibility, and decision-making so growth initiatives are easier to execute and easier to sustain.",
      ],
    },
    "/industries/law-firms": {
      eyebrow: "B2B Commercial",
      title: "Law Firms",
      summary:
        "Sidago is the premier technology partner for law firms.",
      paragraphs: [
        "And this did not come easy for us. It took many late nights for us to be able to become the preferred solution for law firms.",
        "There are many outsourcing firms out there that try to win over law firms, but very few of them go about it in the most innovative manner possible.",
        "We offer law firms the opportunity to outsource services such as:",
      ],
      sections: [
        {
          title: "Branding",
          body: "The legal field is an extremely competitive landscape, and this makes branding for lawyers extremely critical when it comes to unleashing success. Our branding experts can help develop and implement a complete branding solution tailored specifically to the needs of your firm.",
        },
        {
          title: "Comprehensive Online Marketing",
          body: "Remember the days where you'd pick up a phone book, and a majority of the ads were for law firms? You probably still do this, but the truth is that it's not as powerful as it used to be. This is because people are now using the internet to search for legal services. We'll get you seen!",
        },
        {
          title: "Online Presence",
          body: "From ranking in search engines to maintaining a beautiful website, Sidago knows how to make the most out of your online presence. This leads to even more clients and opportunities, which is surely what every law firm wants to have. Simply put, we make the internet work for you.",
        },
        {
          title: "Outsourced Legal Experts",
          body: "We have partnered with many law firms and legal experts to help our clients solve even the most complex cases. Not to mention, the cost of hiring a legal expert from Sidago is known to be a lot less than hiring one on a local basis.",
        },
        {
          title: "Paralegals",
          body: "Having a team of paralegals in-house is expensive, and not all of the time can you find one that's worth keeping. Unfortunately the legal field doesn't slow down, so you need to make sure you have a good solution in place. Sidago offers law firms the opportunity to hire virtual paralegals.",
        },
        {
          title: "Virtual Assistant",
          body: "Need someone to help keep track of your schedule or to handle other tedious day-to-day tasks that you seem to get bombarded with? Just hire an extra set of hands, formally known as a virtual assistant. This not only saves you time, but it will save you a lot of money in the long run.",
        },
      ],
      closing:
        "Are you ready to take your law firm to the next level?\nContact us today for your FREE consultation!",
    },
    "/industries/manufacturing-industrial-products": {
      eyebrow: "B2B Commercial",
      title: "Manufacturing Industrial Products",
      summary:
        "You may or may not have seen the mass of outsourcing firms that claim to have experience with manufacturing/industrial products, but very few can put their skills where their mouth is. Here at Sidago, not only do we have employees that specifically specialize in this industry but so does our upper management.",
      paragraphs: [
        "Here are some of the services that Sidago provides.",
      ],
      sections: [
        {
          title: "B2B Sales",
          body: "When you want to boost your revenues, B2B is a very good way to do it. Especially in the manufacturing/industrial products industry. We have experienced B2B sales professionals on our team that are ready to take your business to new levels of profitability.",
        },
        {
          title: "Data Analytics",
          body: "Being analytical has its advantages. That's why we have offered data analytics solutions to our clients in an effort to help them make the most out of what technology has to offer them. If you don't know how analytics can play a part in your business, just reach out to us directly.",
        },
        {
          title: "Data Entry",
          body: "We all know that this is one industry that involves the collection of a lot of data, but entering this could cost you a lot of money. Especially if you have to hire someone in-house specifically for data entry. Our data entry specialists not only save you time, but they save you money too!",
        },
        {
          title: "Data Visualization",
          body: "Data makes the most sense when it's visualized. Whether you need to do this for a presentation to investors or you need it for a team meeting, we can help interpret your data in the simplest manner possible. You'd be surprised at the doors this simple addition can open.",
        },
        {
          title: "E-Commerce",
          body: "Ecommerce is growing each and every day. This is why we have positioned ourselves as the 'go2' for ecommerce solutions. From advertising to web development, we can help your company make the most from ecommerce.",
        },
        {
          title: "Offshore Manufacturing Consultation",
          body: "Do you want to save money during the manufacturing process? We have developed many relationships with offshore manufacturers to help our clients do exactly this. Don't worry, unlike most offshore manufacturing consultants, we will not sacrifice the quality of the end result.",
        },
        {
          title: "Purchase Ordering/Management",
          body: "Purchase orders can be a time-consuming task, especially when you're trying to put your focus on growing your business. That's why we've taken our knowledge and expertise with POs and purchase order management to provide a complete solution. Let us handle it and just sit back.",
        },
        {
          title: "Virtual Assistants",
          body: "Unfortunately the day only has 24 hours, which makes it challenging to squeeze everything into your schedule. Our virtual assistants provide businesses dealing with manufacturing/industrial products with the opportunity to unload some of the weight to us.",
        },
        {
          title: "Website Development",
          body: "Having your space online is essential in this modern day and age. From maintenance to complete website development, we can help make sure this is something that you can take advantage of. Not to mention, you can use it to streamline your operations.",
        },
      ],
      closing:
        "If you're ready to see how we can make your life (and the lives of your employees) easier, we'd be happy to provide you with a consultation at no cost to you. Simply contact us and we'll get right back with you to set it up.",
    },
    "/industries/accounting-firms": {
      eyebrow: "Financial",
      title: "Accounting Firms",
      summary:
        "You spend all day making sure that your clients are held accountable in the most effective and professional manner possible. You shouldn't have to worry about being overwhelmed by the basic operations of your accounting firm, which is why Sidago is here to be the best partner your accounting firm has ever had.",
      paragraphs: [
        "We offer accountants with services such as:",
      ],
      sections: [
        {
          title: "Advertising/Marketing",
          body: "From building your brand to making the most from tax season, our seasoned advertising & marketing experts know how to open the gates to profitability. No matter if you need a one-time campaign or you'd like us to handle the advertising/marketing for your accounting firm year-round, we've got you covered here at Sidago.",
        },
        {
          title: "Bookkeeping",
          body: "We employ certified and highly-qualified bookkeepers which can act as a support arm for your business. After all, you should be focused on the more intensive accounting tasks and not the basic bookkeeping tasks.",
        },
        {
          title: "Client Acquisition",
          body: "Gaining new clients is what drives the growth for all accounting firms. Neglect taking on new clients and you're seriously limiting the future of your firm. We have helped many leading accounting firms boost their revenues with elite client acquisition services.",
        },
        {
          title: "Online Advertising",
          body: "The world of advertising has changed as we know it, and for the better honestly. In this modern day and age one must innovate in order to stay afloat and maximize their success. We provide complete online advertising management solutions to accounting firms around the world.",
        },
      ],
      closing:
        "If you're ready to partner with Sidago...\nDon't be shy & get in touch with us TODAY!",
    },
    "/industries/banking": {
      eyebrow: "Financial",
      title: "Banking",
      summary:
        "Numbers, numbers, and even more numbers. It's what the day is like in the banking industry, and there's not one outsourcing firm out there that knows it better than the folks here at Sidago. From analyzing data to managing paperwork, we offer the banking industry with a complete outsourcing solution designed to cut costs while embracing efficiency.",
      paragraphs: [
        "The most popular services used by our clients in the banking industry are:",
      ],
      sections: [
        {
          title: "Data Analytics",
          body: "When you want the numbers to speak their story, sometimes you have to get analytical with it. Here at Sidago we offer basic data analytics solutions as well as complete solutions tailored for companies wanting to make the most out of data for the long-term.",
        },
        {
          title: "Data Scientists",
          body: "When it comes to letting data speak for itself, nobody does it better than our beloved data scientists that live and breathe data. The art of competitive intelligence now consists of using data to our advantage in the ever-competitive business landscape.",
        },
        {
          title: "Spreadsheet Management",
          body: "Managing spreadsheets can be a headache, but here at Sidago Integrated Solutions we have it down to a science. We provide complete spreadsheet management solutions for many leaders within the banking industry, see how we can help you get a true handle on your spreadsheets.",
        },
        {
          title: "Virtual Assistants",
          body: "There are only so many hours in a day which makes time management a critical aspect of our everyday life. Get more hours in the day with the help of our highly qualified virtual assistants capable of handling a wide array of tasks.",
        },
      ],
      closing:
        "Today is the day that you make your operations more streamlined...\n\nJust get in touch with the Sidago team to discuss how we can help you manage your operations in the most efficient manner possible. We'll provide you with a free initial consultation to discuss and map out your needs, leading to a custom-tailored solution designed to take you to new heights.",
    },
    "/industries/ad-networks": {
      eyebrow: "Technology",
      title: "Ad Networks",
      summary:
        "Sidago helps ad networks across the globe streamline their operations in the most cost-effective manner possible. In fact, there are many ad networks who rely upon us to provide all of their operations support so that they don't have to worry about managing it in-house.",
      paragraphs: [
        "Some of the services that we offer for ad networks includes:",
      ],
      sections: [
        {
          title: "Affiliate Managers / Relationship Management",
          body: "Whether you want to ensure that your relationships remain intact or you need someone to help manage your affiliates, Sidago has got you covered. We employ only the most experienced affiliate/relationship managers to ensure our clients receive top-notch service.",
        },
        {
          title: "Creative / Graphic Design",
          body: "Our highly talented team of designers know what it takes to create designs that convert. Need a landing page? How about creatives that are sure to unlock profits? Just get in touch with our design team to discuss your needs and the best approach to take.",
        },
        {
          title: "Custom Development",
          body: "Sometimes you just have to get custom with it, and that's why we've taken on some of the best programmers in the world. No matter how complex your custom development needs may be, you can rest assured that we've got you covered here at Sidago.",
        },
        {
          title: "Data Entry",
          body: "We know that you don't necessarily want to enter all of that data yourself, so we found people that don't mind taking care of it. Unleash the power of data, but not the work that's involved with entering it.",
        },
        {
          title: "Fraud Detection / Management",
          body: "Unfortunately the risk of fraud is something that's always going to be present, especially with ad networks as well as others within the industry. That's why we've developed our own ways of detecting/managing fraud and started providing ad networks with an opportunity to win the battle against fraud.",
        },
        {
          title: "Promotional Writing (Blogs, Copywriting, Newsletters)",
          body: "Having the right words can be extremely powerful for your network, but the wrong words could easily stunt its growth. Keeping that in mind, we've looked endlessly for the best writers in the business. We offer all forms of professional writing services ranging from blogs to newsletters, and even sales copy churned out by our creative copywriters.",
        },
        {
          title: "Web Design / Development",
          body: "Whether you need a theme for WordPress (or another CMS for that matter) or you need an extensive site developed, we have the manpower to get it done in the most efficient manner possible. No longer do you have to have designers and programmers in-house.",
        },
      ],
      closing:
        "For more information on how Sidago Integrated Solutions can help you and your company...\nJust get in touch with us by clicking here and schedule your FREE initial consultation with our team.",
    },
    "/industries/affiliate-networks": {
      eyebrow: "Technology",
      title: "Affiliate Networks",
      summary:
        "Running an affiliate network is hard enough on its own, not to mention when you add in all of the positions that you have to fill and supervise. We understand that there are many great affiliate networks out there, but they may lack the resources they need in order to scale it up to the next level.",
      paragraphs: [
        "That's one of the many reasons why Sidago was started. We're here to be your support arm for your affiliate network, and ensure that growth is in sight.",
        "We offer affiliate networks with a wide array of services such as:",
      ],
      sections: [
        {
          title: "Affiliate Managers / Relationship Management",
          body: "Ensuring that you effectively manage your affiliates (and other relationships) is crucial to a network's success. Here at Sidago we employ highly-experienced affiliate managers and relationship managers to ensure that networks can effectively outsource this to us.",
        },
        {
          title: "Creative / Graphic Design",
          body: "No matter what your graphic design needs may be, we have the expertise needed to ensure that your designs fulfill their purpose. From display ads to complete marketing graphic sets, everything will be custom-tailored specifically to your needs.",
        },
        {
          title: "Custom Development",
          body: "While it may seem impossible to get the custom development done for some of your projects, it don't have to be that way. We employ highly experienced developers to ensure that there's no development project that we can't do.",
        },
        {
          title: "Data Entry",
          body: "Data entry may seem like a tedious task but it must be done. Sidago provides complete data entry solutions for affiliate networks around the world. Get in touch with us today to discuss how we can handle your data entry for you.",
        },
        {
          title: "Fraud Detection / Management",
          body: "Fraud has unfortunately taken down a lot of networks and advertisers. However, Sidago has developed a custom solution to ensure that we can provide networks with the opportunity to detect fraud easily and manage fraudulent activities as they arise.",
        },
        {
          title: "Promotional Writing (Blogging, Copywriting, Newsletters)",
          body: "Not everyone was born a wordsmith, and some of the best writers in the industry tend to stay \"in hiding\" which is why we connect networks with some of the best copywriters around. No longer do you have to doubt the power of words, just use them to your advantage.",
        },
        {
          title: "Web Design / Development",
          body: "Visual design is one of the most critical aspects for anything. Hence why we have taken on some great designers and developers to help affiliate networks with their websites, landing pages, and other design/development needs.",
        },
      ],
      closing:
        "Are you ready to unleash the power of Sidago for your affiliate network?",
    },
    "/industries/affiliates": {
      eyebrow: "Technology",
      title: "Affiliate",
      summary:
        "The life of an affiliate can be a profitable one.\nAs long as one has access to the right resources.",
      paragraphs: [
        "One of the biggest setbacks for affiliates is that they don't have the slightest clue how to effectively outsource parts of their operation in an effort to make the most out of their campaigns. We saw this gap in the industry and stepped forward to become what is now known as one of the most prestigious outsourcing firms in the world. It is our goal here at Sidago to present each and every affiliate with the key to success.",
        "Some of the outsourcing services provided by Sidago to affiliates are:",
      ],
      sections: [
        {
          title: "Copywriting",
          body: "When you need words that sell, our highly experienced copywriters know how to intertwine them into a priceless piece. Sure writing may seem like a basic task, but writing to convert is much different than writing a sexy poem for your girlfriend [or boyfriend].",
        },
        {
          title: "Data Entry",
          body: "All of that data, but we know that you really don't want to have to deal with the entry of it if you don't really have to. Our data entry specialists help make that a reality, so start focusing on your profits while our team deals with all of the data that backs it.",
        },
        {
          title: "Forecasting",
          body: "When it comes to forecasting for profitability, our team of highly experienced affiliate marketers and marketing specialists know how to generate reliable forecasts. It's never good to step into the dark without a flashlight, so don't take the risk.",
        },
        {
          title: "Graphic / Creative Design",
          body: "Whether you need a WordPress theme or landing page designed, we employ some of the most creative designers in the industry. Simply put, there's simply no design project that we won't take on as our potential here at Sidago is truly limitless.",
        },
        {
          title: "Optimization",
          body: "You've got your campaign launched, but you know there are much more profits that can be unlocked. Before you start beating your head against the keyboard, get in touch with our optimization experts to reap the biggest payouts possible.",
        },
        {
          title: "Search Engine Marketing",
          body: "We all know that there's tons of traffic that can be bought from Bing, Google, Yahoo, and other popular search engines. However, it can seem to be a daunting task if you let it get the best of you. We've employed expert search engine marketers to help you drive traffic the right way.",
        },
        {
          title: "Search Engine Optimization",
          body: "Nothing is sexier than being on the first page of Google and not having to shell out tons of money doing it. Organic traffic is priceless and we have the means to rank your website on the first page of Google for profitable keywords. Just ask us how we can make it happen.",
        },
        {
          title: "Virtual Assistants",
          body: "Wouldn't it be awesome if you had a clone so that your output can be at the highest peak possible? We may not be scientists that can clone humans, but our VAs can help you get more out of your days.",
        },
      ],
      closing: "Contact Sidago for your FREE consultation!",
    },
    "/industries/healthcare": {
      eyebrow: "Industries",
      title: "Health Care",
      summary:
        "Operational and service support tailored to healthcare environments where reliability, coordination, and trust matter most.",
      paragraphs: [
        "Healthcare organizations work in high-stakes operating environments where service quality, process reliability, and communication discipline all have direct impact.",
        "We support healthcare teams with structured execution across business functions, helping improve operational consistency without adding unnecessary complexity.",
        "The focus is on dependable support models that respect the demands of sensitive, service-critical environments.",
      ],
    },
    "/industries/practices-and-doctors": {
      eyebrow: "Health Care",
      title: "Practices and Doctors",
      summary:
        "The medical industry is booming, and so is the use of technology within it. Sidago is the preferred technology partner for many practices as well as doctors. We are able to do this thanks to our elite team of professionals who live and breathe various areas of tech.",
      paragraphs: [
        "Some of the most popular services that we offer are",
      ],
      sections: [
        {
          title: "CRM Management/Patient Relations",
          body: "Making your patients feel safe and comfortable at the same time can have a great impact on your reputation. In order to help you embrace this opportunity, we offer CRM management and also help you maintain your patient relationships.",
        },
        {
          title: "Insurance Coordination",
          body: "Our insurance coordinators have extensive experience working with practices and doctors to help them receive payment for services. No longer does this have to be a complex task, all you have to do is let Sidago handle it and watch the payments roll in.",
        },
        {
          title: "Insurance Management/Filing",
          body: "Filing insurance claims can be pretty time-consuming, and costly at the same time. Luckily you ended up here at Sidago where we provide you with the opportunity to save time and money by outsourcing one of the most tedious tasks in the business.",
        },
        {
          title: "Online Presence",
          body: "Think of your online presence as your key to success. Having an online presence that shines above the rest can help you not only gain new patients, but also strengthen your reputation at the same time. We can help develop and maintain your online presence to unleash its power.",
        },
        {
          title: "Reputation Management",
          body: "Having a solid reputation is critical, but unfortunately the internet has made it possible for anyone to try to ruin it at the press of a button. We offer full reputation management solutions to help solidify the presence of your practice while ensuring your reputation doesn't take a hit.",
        },
        {
          title: "Web Development",
          body: "Everyone tries to find their answers online, and if you don't have an online presence you're overlooking a great opportunity. Fear no more, Sidago is here! Our offerings range from simple updates all the way to complete website development for practices and doctors.",
        },
      ],
      closing:
        "If you need a service that's not listed, please get in touch with us. The above list is for reference only and consists of our most popular offerings within the medical industry. If you'd like to get the ball rolling, schedule your free consultation today to see how Sidago saves you time and money.",
    },
    "/industries/aerospace-defense": {
      eyebrow: "Industries",
      title: "Aerospace / Defense",
      summary:
        "Sidago is known for providing the Aerospace & Defense industries with an elite staffing solution that allows them to harness the power of technology without having to build out a complete team for it. For many companies, this has helped them reach new levels of success while cutting expenses. No matter what your needs may be, you can rest assured that we can fulfill them in the best manner possible.",
      paragraphs: [
        "We offer services for the Aerospace & Defense industries such as:",
      ],
      sections: [
        {
          title: "Business Development",
          body: "Our business development managers are known for making an impact that wasn't even expected by our clients or their customers. When you need to grow your business, just get in touch with us to find out what opportunities await you.",
        },
        {
          title: "Data Analytics",
          body: "Behind every piece of data lies a story that it wants to share. We specialize in implementing and managing analytical solutions to help make the most out of data for our clients. You'd be surprised how much a little bit of data can help boost your company.",
        },
        {
          title: "Data Entry",
          body: "In the world we live in data comes in large quantities. And unfortunately this isn't always the most pleasurable thing in the world to witness. Instead of being bombarded with tons of data to enter, just have one of our data entry experts provide you with a complete solution.",
        },
        {
          title: "Data Scientists",
          body: "Are you ready to give your business a competitive edge that's sure to boost it to the top of the industry? Our data scientists know how to take data and interpret it in a way that is easy to understand while unlocking opportunities to do things others aren't doing.",
        },
        {
          title: "Data Visualization",
          body: "Sometimes it's better to visualize data, especially when it comes to meetings focused on the data and what kind of intelligence that it provides. We have helped many aerospace & defense companies with data visualization which allows us to provide the most efficient solutions.",
        },
        {
          title: "Sales",
          body: "Every business benefits from an influx in sales, and that's exactly what our sales professionals know how to do for our clients. No longer do you have to worry about having a sales team in-house to help your business grow, Sidago has already built and trained an elite sales team.",
        },
        {
          title: "Virtual Assistants",
          body: "From keeping track of your appointments to helping with general communication, a virtual assistant can simply help you make the most out of each and every day. The power of technology has helped us live a more organized life, and the change is waiting for you.",
        },
      ],
      closing:
        "Unlock the power of Sidago by scheduling your FREE consultation.",
    },
    "/industries/automotive": {
      eyebrow: "Industries",
      title: "Automotive",
      summary:
        "The automotive industry is truly an integral part of our society today, and it will be for many generations to come. That's why Sidago aims to provide the automotive industry with support for their operations that embraces growth and efficiency. No matter what your staffing needs may be, we have the manpower needed to get it done in the highest quality manner possible.",
      paragraphs: [
        "We provide the automotive industry with services such as:",
      ],
      sections: [
        {
          title: "Business Development",
          body: "Do you need a business development manager that can help guide your business to even more levels of profitability while creating everlasting memories? Our business development team has helped many automotive companies unlock the doors to a brighter future.",
        },
        {
          title: "Data Analytics",
          body: "Data has flooded the automotive industry, and in order to make the most of it you have to get into an analytical mindset or hire someone that already is. From setting up analytics programs to managing it in its entirety, we can provide you with the best data analytics around.",
        },
        {
          title: "Data Entry",
          body: "Not craving that moment you have to enter tons of data? Don't worry, you can get out of it by hiring a data entry specialist here at Sidago. We enter the data so you don't have to. Now you can turn your focus onto the more enjoyable aspects of the automotive business.",
        },
        {
          title: "Data Scientists",
          body: "Our data scientists know how to give companies with the competitive edge they need to dominate the industry. With extensive education and experience backing them, nobody can help data tell its story like our data scientists can.",
        },
        {
          title: "Data Visualization",
          body: "All of that data can be mind-boggling if you let it, which is why we have focused on providing the best data visualization solutions around. Whether you need to visualize your data for a presentation or it's solely for internal usage, we can help make the most sense of it.",
        },
        {
          title: "Sales",
          body: "Sales is a critical part of any company, especially one that's in a competitive landscape like the automotive industry. Whether you just need 1 sales executive or a complete sales team, we can ensure that we can help your company reach an entirely new level of profitability.",
        },
        {
          title: "Virtual Assistants",
          body: "While we may not be able to clone you directly, we can help team you up with a virtual assistant who can handle those tedious tasks that you really don't want to deal with. Instead of being overwhelmed during the day, just let one of our virtual assistants streamline it.",
        },
      ],
      closing:
        "Are you ready to see why many leading automotive companies choose Sidago? Schedule your FREE consultation today!",
    },
    "/industries/consumer-product-and-retail": {
      eyebrow: "Industries",
      title: "Consumer Product and Retail",
      summary:
        "Sidago is a premier outsourcing agency dedicated to providing our clients with the highest level of service possible. We love to diversify and innovate which has led us to having a strong foothold within the consumer products and retail industry.",
      paragraphs: [
        "Sidago provides solutions such as:",
      ],
      sections: [
        {
          title: "Advertising / Marketing",
          body: "When you need to get your product(s) to market, there's no doubt that you want to embrace world-class advertising and marketing opportunities. Our team of expert marketers know how to handle all sizes of campaigns meant to drive new business in our clients' direction.",
        },
        {
          title: "Branding",
          body: "Advertising and marketing will help you boost your sales, but you also have to distinguish yourself as a top brand. Doing this will help you gain an edge in your industry while ensuring that the longevity of your brand is protected at all costs.",
        },
        {
          title: "Contact Management / CRM Management",
          body: "When you start to gain customers it can seem overwhelming to protect and manage your relationship with each and every one of them. That's why Sidago Integrated Solutions offers contact management as well as CRM management. This has helped many of our clients streamline their operations while developing rock-solid relationships with their customers.",
        },
        {
          title: "Copywriting",
          body: "Words sell, and online they're the primary factor that contributes to closing a sale. We have employed some of the most creative copywriters in the world to provide complete copywriting solutions. From product descriptions to promotional materials, there's nothing we can't write.",
        },
        {
          title: "Customer Service",
          body: "Providing high-quality customer service is critical in this modern day and age. Zappos has understood this from the beginning and in the process have become one of the largest online retailers in the world. Our customer service solutions can help you better manage this aspect of your business and are available via live chat, email, help desk, and phone.",
        },
        {
          title: "Merchant Account Management",
          body: "Dealing with merchant accounts isn't always the most pleasing experience, and we've learned that many businesses prefer to have someone else handle the management of it so they don't have to do it in-house. We provide complete merchant account management solutions ranging from the initial setup to ongoing management.",
        },
        {
          title: "Technical Assistance",
          body: "We all know that technology drives the world forward, but with this comes times when you need a little help. Whether it's a small issue or something that's on a larger scale, we have a complete tech team ready to provide you with the help you need, when you need it.",
        },
        {
          title: "Web Development",
          body: "From graphic design to complete website development, we provide our clients with the opportunity to make their online presence shine like a diamond. Our designers and developers are ready to make your visual appearance match your company's vision.",
        },
      ],
      closing:
        "For more information or to schedule a free consultation, contact us directly.",
    },
    "/industries/distribution-and-transportation": {
      eyebrow: "Industries",
      title: "Distribution and Transportation",
      summary:
        "Sidago has helped many leading companies in the distribution & transportation industries solve their needs for an extended support arm for their business. We do this by employing only the best employees (who have a wide array of specialization) and allowing companies to outsource some of their most time-consuming tasks.",
      paragraphs: [
        "You can find Sidago offering services such as:",
      ],
      sections: [
        {
          title: "Business Development",
          body: "When it comes to ensuring that your business prospers, our professional business development managers know what it's going to take. Whether you just need consultation or you'd like to hire a business development manager full-time, we can get you taken care of.",
        },
        {
          title: "Data Analytics",
          body: "Our world has evolved into an analytical mindset, at least most of it has with the exception of people that are still stuck using pen and paper. Our data analytics specialists can help you and your company unleash the power of data analytics.",
        },
        {
          title: "Data Entry",
          body: "Entering data is not only time-consuming, but for some it can be a mind-numbing experience. That's why we have a large team of data entry specialists to help eliminate that burden for companies around the globe.",
        },
        {
          title: "Data Scientists",
          body: "Knowing what to do with the data that you collect is critical when it comes to success. Our data scientists know how to make use of the data and use it to propel your company even further to the top. Don't worry, we keep our rates reasonable even for a scientific position.",
        },
        {
          title: "Data Visualization",
          body: "Let data tell its story and you'd be surprised of what it spawns. Visualizing data for meetings or solely for internal use is something that we do daily. No longer do you have to beat your head on the keyboard just to get data to talk to you in a way that's easy to understand.",
        },
        {
          title: "Sales",
          body: "Wouldn't it be nice to have a highly-skilled sales team working to boost the revenue that your company sees coming in? Now you can! Sidago offers complete sales solutions for companies of all sizes, regardless of the complexity of the task at hand.",
        },
        {
          title: "Virtual Assistants",
          body: "Unfortunately we can't grow an extra set of hands, but we can hire someone to help us get a similar outcome. Our virtual assistants work with our clients to handle their tasks that would otherwise run them out of time rather quickly.",
        },
      ],
      closing:
        "If you don't see a service above that you need, please contact us directly for a free consultation. We offer a wide array of solutions considering that we're one of the best outsourcing firms the World Wide Web has ever seen. The question is, are you ready?",
    },
    "/industries/insurance": {
      eyebrow: "Industries",
      title: "Insurance",
      summary:
        "Here at Sidago, we've worked with many brokers and companies within the insurance industry to help provide them with efficient solutions while decreasing the need to handle certain tasks in-house. You can see some of the services that we offer below.",
      paragraphs: [],
      sections: [
        {
          title: "Data Analytics",
          body: "Data tells us a lot, especially within the insurance industry. We can help you and your company embrace the power of data analytics. Simply put, we can help ensure that data has the most impact on your business.",
        },
        {
          title: "Data Entry",
          body: "Entering tons of data isn't always fun, and honestly it can be extremely costly for anyone who doesn't have a system in place. We can take away the headaches associated with data entry and enter all of your data in the timeliest manner possible.",
        },
        {
          title: "Data Science",
          body: "Data has changed the insurance industry as we know it. We have employed many data scientists with extensive industry knowledge to ensure that we can help make the most of data. By doing this, we've unlocked many new opportunities for our clients.",
        },
        {
          title: "Data Visualization",
          body: "Visualizing data is essential, especially for those that find themselves in a data-driven industry. That's why we can help you visualize your data, whether it's for investors or internal use. No matter how complex the project may be, we can nail it right on the head.",
        },
        {
          title: "Forecasting",
          body: "When it comes to forecasting, we like to think that we're pretty good at it. In fact, many of our clients have told us that we are and we continue to provide forecasting services to the insurance agency to help make the most out of your venture.",
        },
        {
          title: "Virtual Assistants",
          body: "The insurance business is hectic enough, and you don't need to make it any more complicated than it has to be. Nor do you need to waste time on tasks that can be handled by someone else. Our virtual assistants are like your twin, and capable of fulfilling many tasks to save you time.",
        },
      ],
      closing:
        "For more information on our services for the insurance industry or to schedule a free consultation, contact us today.",
    },
    "/industries/restaurants": {
      eyebrow: "Industries",
      title: "Restaurants",
      summary:
        "The restaurant business is booming, and there's no better time to unleash this opportunity. We have helped many restaurants develop their presence and use technology to their advantage here at Sidago. Now you have the opportunity to have us do the same for you with services such as:",
      paragraphs: [],
      sections: [
        {
          title: "Branding",
          body: "You want your brand to stick in the head of consumers, so that way they turn to you when they're ready for a lunch meeting or night out on the town. We provide complete branding solutions to help ensure this is exactly what your restaurant reaps the benefits from.",
        },
        {
          title: "Comprehensive Online Marketing",
          body: "The internet is used more now than it has ever been before, and this has many looking online for a restaurant to eat at. Not only do we help boost your online presence, but we're also capable of offering intense online marketing solutions designed to attract patrons.",
        },
        {
          title: "Graphic Design",
          body: "Whether you need graphics for your menus or a complete website design, our talented team of designers and developers can help make this an easy task to tackle. Sidago has an immense amount of experience fulfilling the graphic design needs for restaurants of all sizes.",
        },
        {
          title: "Public Relations",
          body: "Whether you need help cleaning up a PR mess or you need to help boost the authority of your restaurant with PR services, Sidago has you covered. We have a team of dedicated PR specialists trained to help restaurants use the pros to their advantage.",
        },
        {
          title: "Reservation Booking",
          body: "Efficiency is the key to success, and our ability to help restaurants improve their reservation booking processes not only save their customer's time but it saves their business money. We can help you roll out and implement a first-class reservation booking system.",
        },
        {
          title: "Virtual Assistants",
          body: "Instead of having your managers handle tedious tasks (such as data entry and customer communications), just let Sidago do it for a fraction of what it would cost you. Our virtual assistants are right at your side to help you get things done.",
        },
      ],
      closing:
        "Are you ready to take your restaurant to the next level? Schedule your FREE consultation today!",
    },
    "/industries/construction": {
      eyebrow: "Industries",
      title: "Construction",
      summary:
        "Delivering scalable support for every stage of a construction project.",
      paragraphs: [
        "Sidago Integrated Solutions works closely with companies across the construction industry to improve operations, reduce project delays, and support long-term success. Our team provides tailored services that help clients manage projects more effectively, from initial planning through completion. We partner with general contractors, subcontractors, and public sector organizations to meet project goals efficiently. Sidago provides the support needed to handle sourcing, supply chain logistics, estimating, communication, and funding.",
        "Our team provides practical, scalable support across every phase of construction. We act as an extension of your operations team to keep your project running smoothly and aligned with your objectives.",
      ],
      sections: [
        {
          title: "Core Services We Provide",
          bullets: [
            "Construction Supply: Complete material procurement, logistics coordination, and consolidated deliveries",
            "Estimating: Detailed project estimates for budgeting and planning",
            "Take-Offs: Accurate material quantity take-offs based on drawings and scope",
            "CAD Drawings: Technical drafting and visual documentation for engineering and compliance",
            "Financial Raising: Funding support and long-term financing options for construction firms",
            "Sourcing: Supplier selection, negotiation, and quality assurance",
            "Communications: Project communication strategies and coordination tools",
          ],
        },
        {
          title: "Industries and Projects We Support",
          body: "We work with both private and public sector clients in diverse areas of construction. Our services are tailored to meet industry-specific requirements and project challenges. We are equipped to scale and adjust to meet your operational needs.",
          bullets: [
            "Commercial construction and office buildings",
            "Government buildings and infrastructure",
            "Institutional projects including schools and universities",
            "Industrial and manufacturing facility development",
            "Utilities, energy, and sustainable infrastructure projects",
          ],
        },
        {
          title: "Why Choose Sidago for Construction Support?",
          bullets: [
            "Integrated Support: Access a full suite of services through a single provider",
            "Experience with Government Work: Familiarity with regulations and compliance",
            "Scalable Solutions: Our services grow with your project and business",
            "Reliable Outcomes: A proven partner in helping deliver projects on time and within budget",
          ],
        },
        {
          title: "Build Better with Sidago",
          body: "Sidago Integrated Solutions delivers the tools, resources, and insights construction professionals need to succeed. Whether you're launching a new project or scaling operations, we help you build more efficiently and with confidence. Contact us today to learn how we can support your next construction project.",
        },
      ],
      closing: "Visit: https://sidago.com/contact",
    },
  };

  return contentMap[href] ?? null;
}

function getStrategyDetailContent(href = "") {
  if (href === "/strategy/b2b-solutions") {
    return {
      eyebrow: "Our Strategy",
      title: "Case Study",
      summary:
        "Businesses prefer case studies when doing research for their business. Sidago Integrated Solutions carries out case studies for your company and presents the findings to you. We have a team of highly experienced researchers and analysts who collect data and compile it into meaningful information that’s easy to understand. Here’s how it works.",
      paragraphs: [
        "We start out by having an initial consultation with our clients before starting the actual case study. Once the consultation is completed, we carry out the case study using scientific processes. Our case studies have found immense usefulness in addressing various business needs that include employee specialization, efficiency, scalability, and overhead reduction.",
      ],
      sections: [
        {
          title: "The Benefits of Having a Case Study Done",
          bullets: [
            "You get your entire business plan developed with more information while learning about mistakes others have made and how to avoid them.",
            "You also know the best practices for your business and how to adopt them. You can also make changes to your existing plan based on guidance from our case study.",
            "You are able to achieve better employee specialization since you’ll learn about the areas that are critical for your company to target. Our case study will be able to direct your management and human resources personnel to recruit specialists and place them to where they are needed most.",
            "Scalable systems are required for better capacity to handle varying volumes of client requests. You are able to understand which systems and work plans are useful for your particular business from our case studies. A good system is one that can accommodate varying customer demands without getting slowed down or becoming inefficient.",
            "Sidago Integrated Solutions helps you reduce employee overhead. Through our case studies, you will know the areas that generate too much overhead and avoid them. You could also combine roles to reduce the number of employees needed. Another popular solution would be to adopt remote staff depending on the capacity of your organization to work with such a labor model.",
            "The amount of time you save is immense. Your company management will know which tasks are time wasters and possibly assign more labor to them, or hire professionals who are able to accomplish them quickly. Time savings usually translate into better profits for your organization.",
          ],
        },
      ],
      closing:
        "We carry out our case studies at Sidago Integrated Solutions with an objective of helping you understand what has happened or is happening, so that you can be able to plan for the future of your company from an informed point of view.\n\nGet in touch with us today!",
    };
  }

  if (href === "/strategy/entire-plan") {
    return {
      eyebrow: "Our Strategy",
      title: "Entire plan",
      summary:
        "Sidago helps you develop or revise your business processes using the results of case studies that are carried out by our team of highly experienced professionals. You can choose the cases to be studied, or we can research them for you and then carry out the studies. This could be one or several case studies. We can also carry out continuous studies to keep you updated on current trends and strategies within the industry.",
      paragraphs: [
        "The benefits that you get from having a case study done by Sidago Integrated Solutions include, but are not limited to:",
      ],
      sections: [
        {
          title: "Key benefits",
          bullets: [
            "You’re able to develop a sound plan if you don’t have one already.",
            "You’ll be able to make informed changes to your existing plan if you have one.",
            "You get to know the options that are available to you if you ever need to make changes.",
            "You’re kept informed of developments within your industry of operation.",
            "You’re able to make better decisions, and adopt processes of operations that are the most suitable to your business.",
          ],
        },
      ],
      closing:
        "We recommend that we carry out two or more case studies for you so that you are able to compare data from various studies and see what the best practices are that should be adopted by your organization.\n\nContact us today to setup your initial consultation.",
    };
  }

  if (href === "/strategy/rapid-scaling") {
    return {
      eyebrow: "Our Strategy",
      title: "Rapid Scaling",
      summary:
        "Scalability is the ability of a system to cope with increases in demand. The system is expected to cope with or without additional hardware in a seamless, efficient, and effective manner. There is also a form of scalability that is often overlooked, the scalability of operations. Sidago Integrated Solutions has the capacity to carry out case studies that are related to both types of scaling.",
      paragraphs: [
        "In the scaling of systems, we analyze your current system and find out its specifications. We then do a case study of another company or business in your field and find out the systems they use or have used, the advantages and shortcomings of various systems, and how applicable the system can be if integrated within your company. Sidago also carries out studies on the process of implementation and how best to approach the process.",
        "Operations need to be of the right scale for efficiency and cost savings. Having small operations may lead to the inability to satisfy customer demands or spending too much in the process of producing adequate products. Having an operation that is too large may lead to wastefulness of resources and overproduction. Your operations need to be of a scale that allows for a sudden increase in consumer demands without overtaxing the process or failing to meet the demand. We do case studies of operations and supply you with information on the best way to set up your operations so that they are scalable.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/reduced-employee-overhead") {
    return {
      eyebrow: "Our Strategy",
      title: "Reduced Employee Overhead",
      summary:
        "Sidago integrated solutions offers both consultation services as well as provides a comprehensive workforce. For your employee management needs, Sidago gives you valuable business solutions that help you reduce the money you spend in employee related expenses such as salaries, hiring, management, and supervision.",
      paragraphs: [
        "One of the solutions that greatly saved our clients on employee costs is the use of automated processes and integration of computer technology into tasks that are done by manual processes. One computer system can replace more than 10 employees that would require more money to effectively work and remain at work over time. The deficiencies that come with labor are eliminated too. Machines will not get tired, become bored, or get sick. They cannot go on industrial strikes and go-slows.",
        "We also help you in outsourcing some of your processes. Outsourcing processes means that you can get you work done faster and more efficiently. You get to save on the salaries and wages you would have paid to in-house employees. You also get better working environments that are not stressful to your employees which in turn reduces output thus bettering your competitiveness.",
        "With reduced staff members, you get to save on unseen costs due to services required by your employees. Amenities and services such as electricity, water, office space, stationery, paid leaves, and training costs reduce due to less demand and utilization when you reduce the number of your employees. When you are looking to reduce your employee overhead, be sure to consult with Sidago Integrated Solutions.",
      ],
    };
  }

  if (href === "/strategy/time-savings") {
    return {
      eyebrow: "Our Strategy",
      title: "Time Savings",
      summary:
        "A good case study can help you save time in your organization. Sidago remains the preferred partner for many large corporations when it comes to identifying problems and developing solutions for them. We’re able to conduct case studies and hold consultations with experts in various fields to find out how you could be wasting time in your organization and explore ways that you can quickly reduce that waste of time before it becomes detrimental for your business.",
      paragraphs: [
        "We have partner companies who assist us by providing us with information on their operations, so that we help you save time on several fronts including; employees, management, production, processes, and general operations. Sidago will carry out the case study and identify problems within your organization, and then we’ll sit down and develop various strategies to help you save time.",
        "Some of the ways we achieve time savings for you includes:",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Weeding out time-consuming practices.",
            "Introduce efficiency into your operations and production processes.",
            "Overhaul systems that are weak and have bottlenecks.",
            "Replacing systems in their entirety when this option is more cost-efficient than carrying out repairs to the current systems in place.",
            "Helping your employees become specialized so that they’re able to carry out their functions faster. This goes hand in hand with staff diversification so that one person can carry out more than one task.",
            "Less bureaucracy and protocols to involve shorter chains of command",
            "Improve communication between departments and employees.",
          ],
        },
      ],
      closing:
        "Sidago Integrated Solutions has had cases where we had to carry out two or more case studies for our clients in order to give them a clear picture of what they need to do to improve their processes. Once the problems are identified, our consultants will come up with innovative and workable solutions for your organization.",
    };
  }

  if (href === "/strategy/employee-quality") {
    return {
      eyebrow: "Our Strategy",
      title: "Employee Quality",
      summary:
        "Sidago Integrated Solutions is a full service company who serves many top brands around the world. This is why we look at our employees as the key to our success. We value and respect the diversity that each employee brings to the company.",
      paragraphs: [
        "Here's how we're able to employ some of the best employees in the world.",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Our goal is to recruit as well give promotions to employees based on their suitability for available jobs and performance. We do this without discrimination.",
            "We give great priority to the safety and health of all employees; this is inclusive of safety at the work environment.",
            "We work with just and fair policies concerning remuneration.",
            "We're highly committed to creating positive relationships with all employees based on fair treatment and respect for their dignity.",
            "We have the goal to develop an effective communication system to ensure that all employees are able to do their work in the most efficient manner possible. This includes helping and encouraging employees to acquire relevant skills that can assist them when it comes to career growth.",
            "We do not allow any dishonest or fraudulent behavior by any employee, within the company or when dealing with clients.",
            "We encourage employees with conflicts of interest to discuss these issues with their manager.",
          ],
        },
      ],
      closing:
        "Interested in joining the Sidago team! Contact us today, we're hiring!",
    };
  }

  if (href === "/strategy/hiring-model") {
    return {
      eyebrow: "Our Strategy",
      title: "Hiring Model",
      summary:
        "At Sidago Integrated Solutions, we're always on the look out for unique and creative people who possess the potential to assist in building our company, ensure customer satisfaction, as well as thrive within our global and dynamic team. Our selection and hiring process is thorough; as it's designed to get the right candidates and match them to the positions that are right for them with a view to achieving longterm achievement.",
      paragraphs: [
        "At Sidago, we use our hiring process to assess the talents and skills that you have and place you in the right job. The hiring process entails four phases:",
      ],
      sections: [
        {
          title: "1. Initial Hiring Stage",
          body: "At this stage, we take time to answer all questions that you could be having concerning our company as well as gain the information we need about you in order to understand what your needs are and how you could help our company grow to the next level.",
        },
        {
          title: "2. Skill Tests",
          body: "By testing your skills, we can faithfully ensure that our clients get the \"cream of the crop\" when they work with Sidago team members. This will also help us know where you would fit in best.",
        },
        {
          title: "3. Formal Interview",
          body: "After we've done our due diligence and have a general idea of who you are as well as what you're capable of doing, we'll request a formal interview with you. This will help us ensure that if we present you with a job offer, you'll truly be a positive addition to our team. Everyone has their own taste for the type of place that they want to work at, and we want our employees to have the passion needed to help our clients progress rapidly.",
        },
        {
          title: "4. Your Formal Job Offer",
          body: "If you're selected after the Interview, we'll present you with an official job offer. This will include the compensation you can expect and what you'll be doing with us.",
        },
      ],
      closing:
        "If you're ready to be the next sidago employee, contact us today!",
    };
  }

  if (href === "/strategy/operational-philosophy") {
    return {
      eyebrow: "Our Strategy",
      title: "Operational Philosophy",
      summary:
        "We build relationships between stakeholders, employees, and clients. We continuously focus on clients' needs, while keeping our employees encouraged and empowered to deliver the best solutions possible.",
      paragraphs: [
        "Our philosophical perspective of focusing on each customer uniquely benefits our company. We're able to progress quickly while providing long-term opportunities for growth. This ensures that our solutions maximizes and enhances the operations of businesses around the world. In addition, we empower our clients to expand control of their performance and profitability.",
        "We help our clients align their operational processes with our sustainable, yet innovative technological support and business consulting, equipping them with the appropriate solutions to shape their business for results. Our commitment to our clients is built on experience, knowledge, quality, talent, passion, and trust.",
      ],
      sections: [
        {
          title: "Our Mission",
          body: "To deliver qualitative, innovative technological and consulting services while enriching every client's experience and satisfaction.",
        },
        {
          title: "Our Core Values",
          body: "We've developed our business in the most effective way possible, making it more competitive in this modern day and age. We continue a pragmatic approach, flexibility, trust, capability, quality, innovation, and technological applications to improve organizational processes.",
        },
        {
          title: "A Pragmatic Approach",
          body: "We make pragmatic and ethical decisions which create a trust element within the company and among our clients. This approach brings in resilience to the business and to our employees. On the flip side, it facilitates taking the necessary actions in order to improve quality standards. To provide quality service, we focus on our workload and understand the scope and potential resiliency plan. Each work load has a team of specialists to undertake tasks and the team has project managers who supervise each project from start to finish.\n\nIn addition, to improve quality of service we have an automated and simplified workload infrastructure tool which assists work allocation while managing the quality of the workflow.",
        },
        {
          title: "Flexibility",
          body: "We focus on flexibility which has resulted in a health balance of life and work. This approach has resulted in a socioeconomic working conditions that focus on meeting clients expectations.",
        },
        {
          title: "Trust",
          body: "We build trust within the organization and with our clients, which has enabled us to develop long-standing relationships with our clients.",
        },
        {
          title: "Capability",
          body: "We manage workflow by increasing capacity and the level of our capability. We constantly recruit talented professionals from a wide array of backgrounds. Our team has the passion to share their knowledge, and working experiences to help our clients attain success.",
        },
        {
          title: "Quality",
          body: "This is an integral part of our organization. We have enlisted quality control processes to ensure that our clients receive nothing but the best solutions offered within our industry.",
        },
        {
          title: "Innovation",
          body: "Our group of talented and experienced professionals are armed with creative ideas in technology and consulting aspects. They have the ability to take your business to the next level and enable you to compete in a highly competitive marketplace.",
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/outsourceing-philosophy") {
    return {
      eyebrow: "Our Strategy",
      title: "Our Outsourcing Philosophy",
      summary:
        "It's true that the outsourcing industry is currently facing some challenges. Due to this, clients have been asked to simplify their management structures as well as control the customization of their administrative procedures. At Sidago Integrated Solutions we are prepared to deal with such issues. Our solutions are highly customized to suit each client's needs in particular. Our professionalism and sensitivity coupled with sophisticated IT practices makes Sidago the perfect pick for companies who wish to outsource or for the first time, or companies frustrated by their present providers.",
      paragraphs: [
        "Over the tenure of our existence, we've been able to embrace unique experiences as well as build upon our expertise in this particular industry. Our clearly defined, and structured processes are flexible in order to effectively adjust to every client's internal policies. We ensure that all of our processes are carefully controlled at different levels in order to make sure quality isn't something that we overlook.",
        "We understand that it can be difficult to provide our clients with full-service solutions. Therefore, we maintain focus on clients who have complex plans which require sophistication and flexibility. At Sidago Integrated Solutions, we know that the best growth opportunity for us will come from having highly satisfied clients which is why we possess the highest quality control standards in the industry.",
        "As a private entity, we are not in the business of growing at an undefined rate and achieving predefined profit margins. We possess a unique pricing model which usually consists of an all-inclusive price. This allows us to steer away from surprising our clients with hidden fees which have sadly become a \"norm\" in our industry. Even the clients who have been with us for several years don't see any hidden costs.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/quality-assurance") {
    return {
      eyebrow: "Our Strategy",
      title: "Quality Assurance",
      summary:
        "At Sidago Integrated Solutions, we have a concept of quality assurance that ensures the quality of all the services and products that we offer to our clients.",
      paragraphs: [
        "This quality assurance concept includes:",
        "We understand that our international and national customers have very high expectations and requirements; it is for this reason that we strive to provide products and services that are of very high quality.",
        "Besides quality, costs, and time are the tactical factors that ensure the success of a business. This is why we provide our customers with products of high quality levels, established specifications, at competitive prices while ensuring efficient delivery.",
        "At Sidago Integrated Services, we promote and support the awareness of responsibility and quality in our employees. This is through the merging of strategic measures that are geared towards employee motivation and training.",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Punctual/flexible delivery.",
            "A uniform product quality that conforms to high quality standards.",
            "Outstanding process competence for all our products.",
            "Sales support that's extremely professional.",
            "Excellent counsel and recommendations on various designs and applications.",
          ],
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/sidago-hiring") {
    return {
      eyebrow: "Our Strategy",
      title: "Sidago Hiring",
      summary:
        "The world of digital advertising is ever growing each and every day. This empowers our excellent and wonderful people to work in the World Wide Web in a never ending place for all opportunities, long sought or alike to both out of the box and those that are already known as a general norm.",
      paragraphs: [
        "These unique industry standard jobs and influencers and qualities are often shaped from those rare skills to go in and maintain the roles and endeavors. The answer is basically very simple; lay the job and have the passion to sustain it. In doing so, this sets one able to step right in the world of digital advertising as investors or people who were able to push forward and command trusted their network and connection.",
        "Sidago is a creative advertising agency with employees only the best. Sidago also works for Sidago and is given projects and responsibilities ensures the you are on top of latest individual who deserves to be entrusted with important tasks and solutions.",
        "Whatever the nature of digital advertising that you may currently be on or if you desire. Sidago's requirement of quality is very important because this is where an opportunity knows how to provide solutions to every problem or situation that is being presented. An employer's job is mostly practical as long as the employee possesses strong qualities and values.",
        "Follow the drift of the page to learn more about working at Sidago.",
      ],
      sections: [
        {
          title: "Landing Your First Job with Sidago.",
          body: "Below you'll see how things are done when you're given your first job with Sidago.",
        },
        {
          title: "1. Initial Review",
          body: "Your query is just to which is usually a part of one of our many active projects. Once you're able to complete your application within the process, then of course you will be informed if there are any updates that need to be made, concerns or changes that need to be made.",
        },
        {
          title: "2. Communication",
          body: "Applicants are asked to be able to speak effectively in the English language since this is the primary language within our agency. In an effort to increase efficiency, we ask that our applicants also provide us with their Skype IDs so that we may communicate with movement when passing tasks with rigor.\n\nOnce you are hired, of course you'll be expected to use Skype in a large company, so in order for us to be able to keep things organized this means we'll let you down point of contact with Sidago.",
        },
        {
          title: "3. Quality Standards",
          body: "We have our own quality standard processes, and we'll help ensure that you're in compliance with them throughout your stay with us. These refined processes also help our employees share ideas that we use, providing those with the opportunity to take the next step in their career.",
        },
        {
          title: "4. Payments",
          body: "The world schedule for payments. At the end of each project. So if the project requires a very long time to be completed, our workers may progress in certain parts where milestones progress beyond payment will be given.",
        },
        {
          title: "5. Completed Job Review",
          body: "After the completion of each and every project and submitting it to your manager, your management team will also review the quality of your work.\n\nUpon receiving a commendation and satisfactory review for the project completed, Sidago will then hire you on an oral employee. This is the stage where Sidago will be adding new projects for you to complete.",
        },
        {
          title: "The Trial Period: Quality is the best policy.",
          body: "During the trial period, each and everyone will be expected to do the following:",
        },
        {
          title: "Set Your Cost",
          body: "Our employer's satisfaction is highly valued in Sidago. You're given the freedom to quote your rate for a specific project or task. You're an independent contractor. In this sense, we make sure that you know your value in order to maintain your attitude and confidence possible.",
        },
        {
          title: "Communication Is Key",
          body: "Communication freely and often using Skype or email. Your managers and superiors are always available for your support to ensure that you are encouraged and on time. English is the language being used, so you should be able to speak and write English very well.",
        },
        {
          title: "Be Punctual",
          body: "Whenever deadlines are met and projects are completed, your manager explains exactly how the job is then and then the client. Show that you are serious and proud to work for our clients, because your quality is more a business or final task. If you are unable to meet your deadline, let your managers know ahead of time.",
        },
        {
          title: "We Ensure Our Clients Get High Quality Service",
          body: "All service and projects submitted will undergo a quality assurance process and should pass Sidago's quality standards. This is when your finished project will be inspected and checked thoroughly. Feedback will be provided immediately so you'll know how to correct any errors or mistakes if there are any.\n\nOnce you have successfully completed all the processes and screening that everything goes smoothly, you'll be invited by Sidago to become a full-time employee. Make sure this means! It means that your work, and care is moving longterm work, benefits, and stability.\n\nA company as big as Sidago needs only the best from the people that we hire. As the company's goal is to provide full-time employment to a diverse team around the world, Sidago is concerned on how the company can furthermore help its people grow and feel secured while the company grows.\n\nAt Sidago we're always looking for fantastic, unique, diligent, and out of the box thinkers to be added to our fine team of hard workers to keep ahead in the ever changing pace and trends. Chances and advertising experts push their creativity together so they can provide the latest and concepts for leading brands. This is what Sidago strives for each and every day.\n\nWould you like to work from home while enjoying the benefits that a full-time job has to offer? Want to take your career to the next level? Sidago can help you do exactly that. Together, let's keep Sidago and our minds to the world of advertising, marketing, and web development.",
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/benefit-savings") {
    return {
      eyebrow: "Our Strategy",
      title: "Benefit Savings",
      summary:
        "Employees are supposed to be assistive to the success of your business. Rules and regulations require that you have employee benefits for those working under you. We ensure that you comply with the law but at the same time save on your costs as much as possible. Too much spending on employee benefits could lead to huge losses, and that's the bottom line.",
      paragraphs: [
        "Sidago Integrated Solutions provides you with benefit savings opportunities by helping you hire staff and manage them remotely. When you're working with remote staff that's not classified as a permanent part of your workforce, you'll find that you save a lot of money on employee benefits. Hiring remote staff and getting proper management as well as supervision methods is where Sidago Integrated Solutions comes in.",
        "At Sidago, we'll study your business model closely and evaluate your markets along with your production and management methods. We will then come up with remote worker solutions that will easily fit into your business model with minimal disruption of normal operations while improving the quality of your output.",
        "In most instances, you'll also save money by hiring remote staff when you only need it instead of having personnel that is permanently on your payroll even when there is no work to be done. Working with remote staff has helped our client companies achieve better profitability by realizing benefit savings and we're always learning so that we can keep our clients headed to the next level.",
      ],
      closing:
        "Reach out to one of our highly trained professionals so that we can you get (and keep) the ball rolling.",
    };
  }

  if (href === "/strategy/employee-reassignment") {
    return {
      eyebrow: "Our Strategy",
      title: "Employee Reassignment",
      summary:
        "A growing number of clients recognize the benefits of flexible arrangements (including employee reassignment) when running a successful business. In a world driven by modern tech, you now have the ability to hire from all parts of the world and all walks of life. At Sidago, our approach to hiring and retention links the strengths, conditions, passions, and interests of our employees to our business needs. Employee reassignment provides greater employee satisfaction and productivity which brings in more profit.",
      paragraphs: [
        "We capitalize on the talent that a diverse group brings to our workplace, aiding us in meeting our goals and objectives. We focus on key tasks by using the best specialists' skills.",
        "Note that our distinguished flexible work arrangement strategy offers employees the option of flexible assignment and also the ability work from different locations. This makes it easy to assign tasks to employees with specific competence in those areas to support your business goals and meet the clients' requirements.",
        "Employee reassignment is an effective means to fill gaps in experience and knowledge, ascertaining them to handle the task far more efficiency while bringing in fresh, new, unbiased perspectives. Moving employees laterally or vertically within the organization increases skills and creates a more flexible team while bridging productivity gaps.",
      ],
      sections: [
        {
          title: "Employee reassignment enables businesses to:",
          bullets: [
            "Increase productivity and profitability of their operations.",
            "Increase retention of qualified, experienced, and talented specialists.",
            "Improve return-to-work outcomes after short/long term voluntary breaks.",
            "Embrace a more diversified cultured workforce.",
            "Develop an all-encompassing work environment",
          ],
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/employee-specialization") {
    return {
      eyebrow: "Our Strategy",
      title: "Employee Specialization",
      summary:
        "While many companies would like to achieve employee specialization, few are able to do so in an effective, yet efficient manner. Sidago Integrated Solutions has come up with the solution for this common issue. We carry out case studies of other businesses and companies in your field, or those that have been faced with a similar problem so that you can know how best to go about achieving employee specialization in your company.",
      paragraphs: [
        "Our case studies are designed by professionals who are highly experienced in case studies. We then execute them in a professional and scientific manner. We employ various tools to collect information, analyze it, and come up with the final findings as well as the recommended approach.",
        "You receive recommendations on whether or not there is a need to have specialized employees depending on the size of your business and the complexity of your operations. Your market also determines if it's logical for you to have specialized employees or not. With our case studies, you'll:",
        "Having specialization where it's not necessary can be expensive since specialized employees often get paid more. Being able to know your specialization needs also helps you in planning for the future of your company. This makes it critical to embrace the opportunity to work with Sidago Integrated Solutions for all of your case study needs in determining how, when, and where to apply specialized employees within your company or organization.",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Get to know where specialization is required.",
            "Prioritize the areas to start with when it comes to getting specialized employees.",
            "Understand the best method to achieve specialization; whether to hire or train your staff within specific specialties.",
          ],
        },
      ],
      closing: "Please feel free to contact us for any further inquiries.",
    };
  }

  if (href === "/strategy/external-team-entirely-managed") {
    return {
      eyebrow: "Our Strategy",
      title: "External Team Entirely Managed",
      summary:
        "Sidago Integrated Solutions has your success in mind. We commit ourselves to coming up with solutions to get your company management firmly on its feet and achieve profitability. Companies that have external work teams need tracking, supervisory, and management solutions that allow them to maintain order and efficiency within their company's operations.",
      paragraphs: [
        "We develop solutions that enable you to hire external personnel and at the same time help you in the management of these new employees. Working with our customized methods and software, you are able to log how each person is working, the time spent working, and what they do. You can also issue instructions to them via the software.",
        "Your external teams are easily managed using our solutions. We also provide consultancy services for hiring of \"virtual employees.\" These could be freelancers or employees from your home office who prefer to work remotely.",
        "For companies that hire external staff from other companies, you need protocols to govern how you'll be operating within the confines of a mutually shared work environment. It is important that the externally sourced personnel do not break the existing protocols or end up causing customer dissatisfaction with inappropriate behavior.",
      ],
      closing:
        "If you're ready to have an entire team at your disposal, schedule your initial consultation today!",
    };
  }

  if (href === "/strategy/major-cost-savings") {
    return {
      eyebrow: "Our Strategy",
      title: "Major Cost Savings",
      summary:
        "At Sidago Integrated Solutions, we save you a lot of expenses that you would incur. Working with us enables you to seal low-cost business deals with our development and management teams. You also get to consult with us and learn \"tricks of your trade\" that will help you reduce the amount of money you spend on processes such as hiring. You'll get high quality returns on your investments when you work with the team here at Sidago.",
      paragraphs: [
        "Automation and embracing technology is another area that will save you costs. Using manual processes and labor is quite inefficient and costly if there's a technological option for the same. Tasks such as email responses and record keeping can be automated by our highly trained professionals using various computer-run systems. This allows such jobs to be done by a single computer instead of a whole group of people who need to be supervised, managed, and paid wages.",
        "We continuously seek more affordable solutions that are of high quality for our client's ventures. This gives them the extra edge that they need to stay ahead of their competitors and retain their market presence at a lower cost. The extra money that's saved can then be used for expansion and product development.",
        "The aim of any company is to remain profitable. This means that input has to be low-cost but the output to be of the highest quality possible while remaining attractive to your customers. Automation and working with Sidago as your business partner allows you to reasonably cut your costs and reduce employee costs while improving your output.",
      ],
    };
  }

  if (href === "/strategy/managed-human-resources") {
    return {
      eyebrow: "Our Strategy",
      title: "Managed Human Resources",
      summary:
        "For those of you with human resource management needs, Sidago Integrated Solutions has the long-awaited solution that's sure to generate the most success from your business. We have then capacity and experience gained from many years of hiring on behalf of our clients and for ourselves. Our hiring process begins with advertising openings in the right places and using the right channels to reach a wide talent pool from where we will hire personnel for you. We ensure that only professionals with experience and who can fit into your busy work environment are hired.We also assist you in getting the best human resource management methods to ensure that your staff is productive and optimized. These are methods that are suited for your company and will work easily under the stewardship of your management teams. We also ensure proper integration of the management procedures in your company. We provide management systems that are both technological and conventional for application in your company.",
      paragraphs: [
        "For remote worker management, Sidago Integrated Systems comes up with protocols and processes that streamlines communication with your remote staff. We'll also help you keep track of your remote staff management systems.",
        "No matter what industry your company finds itself in, Sidago Integrated Solutions has the most advanced management solution for your company. You'll find that we'll remain the best partner you can have when it comes to human resource management. Reach out to one of our HR specialists today and schedule your initial call.",
      ],
      closing: "YOU WON'T BE DISAPPOINTED!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/management-savings") {
    return {
      eyebrow: "Our Strategy",
      title: "Management savings",
      summary:
        "Management can be expensive for companies that don't embrace modern methods of supervision and employee management. Sidago Integrated Solutions has experience in helping our clients save when it comes to their management costs. We have professional teams that will provide consultation services in human resource management and employee hiring processes that get you self-driven employees that don't demand excessive supervision.",
      paragraphs: [
        "We also help you with the development of management protocols and methods that allow for easier flow of information and feedback within the company management circles so that there is an advanced line of communication. Working with Sidago Integrated Solutions will employ you with a competent workforce that's responsive and responsible, without having to be pushed by their managers to carry out their duties.",
        "Apart from development, Sidago Integrated Solutions helps you put the protocols and procedures agreed on in place. Implementation is an important phase in any company's work structures and it can turn disastrous if mismanaged. Improper implementation of agreed solutions can lead to confusion in roles played and overlapping of tasks. To save your company from making wrong management solution implementation steps, Sidago works with your company to put in place management solutions in an efficient manner that will see you realize the intended management savings.",
        "We also help you in your human resource processes such as hiring. We ensure that you get to hire highly qualified personnel who are capable of working with minimum supervisory input. These employees are able to work and produce quality results in enabling environments at the workplace. You should have Sidago as your preferred business partner in your endeavors to save costs in management.",
      ],
      closing:
        "To schedule a free consultation, contact us today.",
    };
  }

  if (href === "/strategy/rapid-scalability-options") {
    return {
      eyebrow: "Our Strategy",
      title: "Rapid Scalability Options",
      summary:
        "For any startup company, the next big dream is to grow up bigger and better. A business needs to increase its customer base, operations, and service areas while kicking sales and profits up to the next level. In an essence, scaling up or expansion is mandatory for a business.",
      paragraphs: [
        "In order to benefit the business owner's(s) as well as the employees, a business needs to scale up. However, scaling up is a complex task. Most businesses expect to achieve a scale-up within a limited time frame - which is known as rapid scaling. Rapid scaling is good, but comes with a lot of risks. For instance, one could get carried away with the excitement on scaling up and end up putting their focus entirely on increasing the numbers, while the quality of his/her products or services starts to see a decline.",
        "This will in turn create customer dissatisfaction. Unhappy customers are not a healthy prospect for the growth of the company. Therefore, rapid scaling should be carefully planned and implemented. Typically, it's recommended to use the service of a professional if a business wants to scale-up or scale-down itself.",
        "Sidago Integrated Solutions is a consultation firm that provides a wide array of consolidated and organized services, including rapid scaling options to cater to different business needs. A business can relieve itself of the scaling operation and leave it up to the experienced professionals here at Sidago. With an affordable price and customized service, Sidago assists its clients to continue smooth operations, while it take cares of scaling up/down of its employees, infrastructure, and operations by undertaking recruitment and training, operation design, handling infrastructure contracts and installation.",
        "Sidago follows a well-defined, transparent process in rapid scaling implementation. The process starts with clear definition of goals and objectives, establishing a timeframe for delivery. Sidago ensures the implementation of scaling is in a way that does not disrupt the routine operations of the business. Its scaling process is followed by a well defined review process, which critically evaluates the performance impacts and make necessary steps to overcome negative impacts.",
      ],
      sections: [
        {
          title: "What aspects of a business can be scaled using rapid scaling?",
          body: "Starting from the workforce, the operations, the processes, and the capacity of a business can be subjected to rapid scaling. Bulk hiring of employees will be required to cater to the growing demand for urgent deliveries. Infrastructure expansion will be needed when the head count increases, and the company undertakes more orders to be completed within a short timeframe. Such scaling consumes a lot of time, effort and money, which could otherwise be spent on actual operations for quality delivery. Hence, rapid scaling needs to be managed with caution in order to maintain the stability and smooth operations in the business.",
        },
      ],
      closing:
        "Sidago ensures 100% customer satisfaction with its rapid scaling services, while ensuring they achieve their growth targets flawlessly. Contact us today!",
    };
  }

  if (href === "/strategy/remain-competitive") {
    return {
      eyebrow: "Our Strategy",
      title: "Remain Competitive",
      summary:
        "Closing shop for any business venture is a painful and loss-inducing event. You have to remain competitive in the modern business environments and operate profitably to prevent yourself from becoming another statistic in this sense. You'll find that this can only happen if you embrace modern methods in hiring, management, marketing, and distribution.",
      paragraphs: [
        "Today, the markets shift quickly and you have to be able to keep up with the changes while remaining at par with your competitors, if not ahead of them. Any company that fails at this will end up incurring losses and most likely having to shut down their operations. Sidago helps you retain your edge against your competitors and become a leader within your industry.",
        "We provide solutions that have been developed and tested thoroughly by professionals so that you retain your competitiveness. Remaining competitive requires that you be keen in reading your market and seek lower production solutions. A high quality is also required of your products in order to ensure that they're self-marketing.",
        "We come up with unique, yet innovative solutions tailored around your individual business needs. These solutions are easy to implement and manage so that you do not incur extra costs to manage. We have solutions in marketing, production, web development, administration, and management that have helped our client companies remain in the market for years and perform exceptionally well.",
        "We integrate our technological solutions into your daily operations and in management so that you are able to work at profitable levels without affecting the quality of your output. Our experienced and well-equipped staff at Sidago Integrated Solutions ensures that remaining competitive is not a problem for you; we ensure that you are at the leading front in your industry.",
      ],
    };
  }

  if (href === "/strategy/workflow-efficiency") {
    return {
      eyebrow: "Our Strategy",
      title: "Workflow Efficiency",
      summary:
        "Workflow management is becoming more popular in today's era. At Sidago Integrated Solutions, we've developed a simplified workflow management tool. This tool will improve operational efficiency and reduce business costs. It's easy to use and offers work tracking assistance, lower risk of errors, delays, skipped tasks, redundancies, or other inconvenient moments common with older methods and tactics. Our workflow results are cost beneficial and provide competitive gains. It makes it easy to see, analyse, and backtrack work, which creates an automated workflow.",
      paragraphs: [
        "Our workflow management tool consists of various streams of action, where each individual part comprises of regular day-to-day activity. It is an easy-to-use tool or software application, which creates real-time process maps, visualisation of the workflow and the work assigned to the specialists. We can view every step in the flow, as well as every specialist, manager, and department involved.",
        "In addition, it helps us understand what actions will take us to the next stage in the flow in an effort to provide our clients with the desired results. This process assists Sidago on a regular basis to streamline the workflow, manage employees efficiently, and eliminate unrequired processes. This helps management re-engineer safeguards into processes improving the operational efficiencies. Our workflow management tool captures actions across the domains of services we provide to the clients forming a platform to visualise the workflow efficiency while maintaining integrity of the flow and ensuring the right sequence of flow is upheld.",
        "In other words, our processes are streamlined and workflow efficiency is constantly measured leading to improved profitability and on-time results. The standardization of processes, a complete business analysis, and a clear communication by key (and knowledgeable) specialists within our organisation, builds the base for our workflow project's success.",
        "We at Sidago want to bring workflow efficiency to all platforms to improve your efficiency in \"day to day\" tasks and increase your returns of investment (ROI). Come work with our talented, experienced, and unique professionals.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/initial-consultation") {
    return {
      eyebrow: "Our Strategy",
      title: "Initial Consultation",
      summary:
        "Any time that there's a need for business processes to be changed or improved, there's a discovery phase. This is where the customer comes and explains that he has a problem in his business process - which he can't pinpoint and asks us to help find the problem and fix it. Sometimes, the people who are closer to the issue can't really understand the real problem although they know there's one. The customer gives us a walkthrough of his/her business, elaborating every nut & bolt in it.",
      paragraphs: [
        "We then ask the client specific questions to understand the problem and how it has surfaced. In this phase, we collect as much information about the business as possible. This includes understanding the existing business structure, historical milestones, objectives, vision, job descriptions, and overall employee satisfaction.",
        "Our initial consultation can happen through presentations, video conferencing, face-to-face discussions, Q&A sessions, or even by going through relevant documents related to the business. During these discussions, we draw flow-charts, process flows, and activity diagrams to understand the existing business. We encourage our clients be as transparent as possible, in order to develop a perfect solution for them.",
      ],
      closing:
        "Are you ready to schedule your FREE initial consultation?",
    };
  }

  if (href === "/strategy/general-business-review") {
    return {
      eyebrow: "Our Strategy",
      title: "General Business Review",
      summary:
        "After gathering the relevant information about your business, we start the business review process. This includes analyzing both the internal and external climate of a business in order to get a better understanding of its capabilities, opportunities, weaknesses, and customers. This is followed by taking measures to address any issues that are discovered.",
      paragraphs: [
        "We introduce the changes to the processes where there are productivity/quality issues, change work schedules, or introduce new jobs. There can also be instances where innovation and creativity could help the business grow. Therefore, we look for opportunities within the business where innovation can take place.",
        "Our suggestions could include integrating or improving technology used within your organization, address a different market segment that's overlook, or increase your overall marketing efforts. At the end of this review, we prepare a comprehensive report - for our reference as well as for your reference. This report will consist of a detailed analysis of the current business state, the reasons for the drop in productivity and profits, existing flaws in the processes, and what needs to be done in order to overcome them. We also do a visual presentation, where clients can ask us questions to clarify their doubts.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/job-and-work-reviews") {
    return {
      eyebrow: "Our Strategy",
      title: "Job & Work Reviews",
      summary:
        "Most of the time, weaknesses lie within the job definition itself. Sometimes there's no adequate job training for employees assigned to the job for them to do it productively. A lot of organizations don't have clear job definitions, so their employees are unclear about their responsibilities and goals. Other times, there can be flaws with the current job process which hinders the employee from giving maximum productivity to the business. Therefore, in order to improve the existing operations, the daily tasks of each and every employee may change to some degree.",
      paragraphs: [
        "A team of people, which includes experts called Subject Matter Experts (SMEs) will be involved in redefining how the work should be done. This is done after a full examination of the current job roles and discussing with the employees the difficulties they face when performing their jobs. We decide what type of jobs and roles need to be established to carry out the work.",
        "We also develop and implement clear job titles, job descriptions, and their career paths. We'll also elaborate on how the productivity and quality of each job contributes to the success of the business. The SME team will also be responsible for introducing these new methodologies and processes. This will also include making plans for the training of the employees, so that employees can easily adjust themselves to the new job roles and responsibilities.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/employee-interviewing") {
    return {
      eyebrow: "Our Strategy",
      title: "Employee Interviewing",
      summary:
        "When defining the new business process to an organization, we may decide to outsource certain parts of the business - such as HR, finance, and maintenance. We may also need to hire freelancers for minor jobs such as writing, data entry, press releases, etc. The type of outsourcing will depend on the nature of the business. Furthermore, we may need to hire new employees to cater to the new jobs that were designed as part of the re-engineering process.",
      paragraphs: [
        "Interviews will be conducted to recruit freelancers or service companies to outsource part of the services as planned. In-house recruitment could also take place. Qualifications and experience requirements will be developed and published in job portals/professional networks in order to find the right employees.",
        "By the time we get to this stage we already have clear job definitions with salary scales, training requirements, and the career path already chosen. We also need to set legal boundaries, especially when outsourcing the internal services, as there is the possibility of intellectual property violations and security breaches on sensitive data. These parameters need to be considered during the vacancy publishing and interviewing process. Conducting interviews can be done by the business itself, or Sidago can take over the interviewing process. We will short list a few candidates according to the requirements and the qualifications.",
      ],
    };
  }

  if (href === "/strategy/estimated-cost-savings") {
    return {
      eyebrow: "Our Strategy",
      title: "Estimated Cost Savings",
      summary:
        "No matter how important change is, it costs both time and money. Businesses need to spend on internal and external resources in order to review, plan, implement, and monitor a change. Therefore, when it comes to business process re-engineering, the cost and the ROI is a key concern for our clients.",
      paragraphs: [
        "Our clients typically have these concerns. Therefore, after evaluating the existing business and identifying where the changes have to be made, we prepare a cost matrix. The cost matrix elaborates what the cost of each phase is going to be and how that cost can be recovered after implementing the new plan.",
        "Our cost savings estimation strategy includes identifying the root cause for cost increase, evaluating the impact of cost cutting on performance, and planning for improvement of the quality of service during the cost-cutting stage. We compare and contrast the current expenses of your business with that of the proposed business plan while carefully giving thought to where the cost can be cut down without compromising the productivity, quality, and efficiency of the business. Overall, the change may involve a considerable cost. However, that cost can be recovered when the productivity and the quality of the business improves.",
      ],
      sections: [
        {
          title: "",
          bullets: [
            "Will a change in process cut down my cost and/or increase my income?",
            "Will the amount I spend on implementing a change give me the expected benefits within a reasonable period of time?",
          ],
        },
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/propose-action-plan") {
    return {
      eyebrow: "Our Strategy",
      title: "Propose Action Plan",
      summary:
        "Action plans help get the business on the right track. An action plan is an internal document that tells the business what actions need to be taken on a daily basis while running the company. After careful evaluation of all parameters, we develop the new plans for the business. We propose which services should be outsourced as well as how to change the HR, financial, and operations aspects of the business to achieve better results.",
      paragraphs: [
        "The action plan also includes cost estimation, financial risk planning, and setting profit expectations. The action plan will consist of a timeline, tasks, and deliverables for each employee. The action plan starts with defining goals so that each member of the business knows what they are trying to achieve. Each step in the plan has a deadline to be achieved, and measures to be taken if the managers realize that a particular task can't be achieved within the deadline.",
        "The business plan we prepare is put under heavy review by 2 independent internal teams before submitting it to the customer. The customer will review the proposal and suggest changes and alternations that they feel are necessary. We're always open to suggestions from our customers in preparing the action plan. However, before incorporating them in to the actual plan, we do a critical evaluation to measure if proposals align with the overall plan and the goals that need to be met.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  if (href === "/strategy/implementation") {
    return {
      eyebrow: "Our Strategy",
      title: "Implementation",
      summary:
        "Implementation will depend upon the action(s) that need to be taken. Plans will be re-discussed and achievable goals will be set. Tasks will be assigned to the employees, giving clear objectives, and delivery expectations. Employees will also be provided with a clear overview of the changes that were introduced. If required, the employee will undergo training.",
      paragraphs: [
        "Implementation is the most critical part of a new business process, as it involves significant changes to how things have been done in the past. Therefore, there can be some resistance from employees and even a drop of productivity in the initial phase. However, these conditions will gradually improve as your employees become familiar with the new processes and techniques.",
        "It's critical that there's a perfect combination of soft skills and hard skills in order to effectively implement the changes needed within an organization. Soft skills include leadership, communication, and conflict management. Hard skills involve strategic planning and project management.",
        "We also do periodic reviews of performance, cost analysis, and customer service on behalf of the business, in order to ensure that the new business process is on the right track and is delivering the expected results.",
      ],
      closing: "GET IN TOUCH WITH US TODAY!",
      closingHref: "/contact",
    };
  }

  for (const group of strategyMenuItems) {
    if (group.href === href) {
      return {
        eyebrow: "Our Strategy",
        title: group.title,
        summary: "",
        paragraphs: [],
        sections: [],
        closing: "",
      };
    }

    for (const child of group.children ?? []) {
      if (child.href === href) {
        return {
          eyebrow: group.title,
          title: child.title,
          summary: "",
          paragraphs: [],
          sections: [],
          closing: "",
        };
      }
    }
  }

  return null;
}

function getStrategyMenuGroups() {
  return strategyMenuItems.map((item) => ({
    title: item.title,
    href: item.href,
    children: (item.children ?? []).map((child) => ({
      title: child.title,
      href: child.href,
    })),
  }));
}

function shouldUseStrategyFirstChild(pathname, group) {
  if (!group?.href || !group?.children?.length) {
    return false;
  }

  return (
    normalizeStrategyPath(pathname) === normalizeStrategyPath(group.href)
  );
}

function getStrategyDefaultItem(pathname, group) {
  if (!group) {
    return null;
  }

  if (shouldUseStrategyFirstChild(pathname, group)) {
    return group.children[0];
  }

  return group;
}

function resolveConfig(type, slug, serviceGroups, industryGroups, strategyGroups) {
  if (type === "strategy") {
    const pathname = `/strategy/${slug}`;
    const groups = strategyGroups?.length
      ? normalizeMenuGroups(strategyGroups)
      : getStrategyMenuGroups();
    const suppliedContext = strategyGroups?.length
      ? getMenuContextFromGroups(pathname, groups)
      : null;
    const normalizedSuppliedContext =
      suppliedContext && shouldUseStrategyFirstChild(pathname, suppliedContext.group)
        ? {
            ...suppliedContext,
            currentItem:
              getStrategyDefaultItem(pathname, suppliedContext.group) ??
              suppliedContext.currentItem,
          }
        : suppliedContext;
    const activeStrategyItem =
      normalizedSuppliedContext?.group ??
      getActiveStrategyItem(pathname) ??
      strategyMenuItems[0];

    return {
      menuContext: normalizedSuppliedContext || {
        group: {
          title: activeStrategyItem.title,
          href: activeStrategyItem.href,
          children: activeStrategyItem.children ?? [],
        },
        currentItem:
          activeStrategyItem.children?.find(
            (child) =>
              normalizeStrategyPath(child.href) ===
              normalizeStrategyPath(pathname),
          ) ??
          getStrategyDefaultItem(pathname, activeStrategyItem),
        tabs: activeStrategyItem.children ?? [],
      },
      groups,
      introTitle: "Our Strategy",
      introDescription:
        "Empowering growth-focused teams with clear strategic direction, operational alignment, and dependable execution across every stage of business development.",
      imageSrc: "/images/Secondary-About.svg",
      imageAltPrefix: "strategy",
      panelClassName: "bg-purple-light",
    };
  }

  if (type === "industry") {
    const groups = industryGroups?.length
      ? normalizeMenuGroups(industryGroups)
      : getIndustryMenuGroups();
    return {
      menuContext: industryGroups?.length
        ? getIndustryMenuContextFromGroups(slug, groups)
        : getIndustryMenuContext(slug),
      groups,
      introTitle: "Specialized solutions for modern industries",
      introDescription:
        "Empowering industry-focused teams with adaptable service models, strategic execution, and dependable delivery across every business function.",
      imageSrc: "/images/Secondary-About.svg",
      imageAltPrefix: "industries",
      panelClassName: "",
    };
  }

  const groups = serviceGroups?.length
    ? normalizeMenuGroups(serviceGroups)
    : getServicesMenuGroups();
  const menuContext = serviceGroups?.length
    ? getServiceMenuContextFromGroups(slug, groups)
    : getServiceMenuContext(slug);
  const { introTitle, introDescription } = getServiceIntroContent(
    menuContext?.group?.title,
  );

  return {
    menuContext,
    groups,
    introTitle,
    introDescription,
    imageSrc:
      "https://wp-corp-site.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/03/17212522/Governance-Pyth.svg",
    imageAltPrefix: "services",
    panelClassName: "bg-purple-light",
  };
}

export default function ContentTab({
  slug = "",
  type = "service",
  serviceGroups = [],
  industryGroups = [],
  strategyGroups = [],
  hideMenuOnMobile = type === "service",
}) {
  const {
    menuContext,
    groups,
    introTitle,
    introDescription,
    imageSrc,
    imageAltPrefix,
    panelClassName,
  } = resolveConfig(type, slug, serviceGroups, industryGroups, strategyGroups);

  const [expandedGroup, setExpandedGroup] = useState(
    menuContext?.group?.title ?? groups?.[0]?.title ?? "",
  );
  const [activeHref, setActiveHref] = useState(() => {
    if (menuContext?.currentItem?.href) {
      return menuContext.currentItem.href;
    }

    if (groups?.length) {
      return groups[0]?.children?.[0]?.href ?? groups[0]?.href ?? "";
    }

    return menuContext?.tabs?.[0]?.href ?? "";
  });

  const selectTab = useCallback(
    (href) => {
      if (!href) {
        return;
      }

      const path = normalizePath(href);
      if (!path || path === "#") {
        return;
      }

      setActiveHref(href);

      if (normalizePath(window.location.pathname) !== path) {
        window.history.pushState({ contentTab: true }, "", path);
      }
    },
    [],
  );

  const [nestedServiceAccordionHref, setNestedServiceAccordionHref] =
    useState("");

  useEffect(() => {
    if (!menuContext?.group) {
      return;
    }
    const nextTitle =
      menuContext.group.title ?? menuContext.group.label ?? "";
    if (nextTitle) {
      setExpandedGroup(nextTitle);
    }
    if (menuContext.currentItem?.href) {
      const nextHref = menuContext.currentItem.href;
      setActiveHref((current) =>
        normalizePath(current) === normalizePath(nextHref) ? current : nextHref,
      );
    }
    // menuContext is a new object each render from resolveConfig; sync only from slug-driven primitives.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: avoid unstable menuContext reference
  }, [
    type,
    slug,
    menuContext?.group?.title,
    menuContext?.group?.label,
    menuContext?.currentItem?.href,
  ]);

  useEffect(() => {
    if (!groups?.length) {
      setNestedServiceAccordionHref("");
      return;
    }

    if (type === "service" && slug) {
      const path = `/services/${slug}/`;

      for (const g of groups) {
        const parent = findNestedServiceParentHref(g.children, path);

        if (parent) {
          setNestedServiceAccordionHref(parent);
          return;
        }
      }
    }

    if (!expandedGroup) {
      setNestedServiceAccordionHref("");
      return;
    }

    // Do not auto-open the first nested row here: under Administrative Support the
    // first item with sub-links is "What We Write", but the default tab should be
    // the first list item (e.g. Administrative Services). Nested accordions open
    // only when the URL slug matches a nested path (handled above).
    setNestedServiceAccordionHref("");
  }, [type, slug, expandedGroup]);

  useEffect(() => {
    const syncFromBrowserPath = () => {
      const href = findMenuHrefForPath(window.location.pathname, groups);
      if (href) {
        setActiveHref(href);
      }
    };

    window.addEventListener("popstate", syncFromBrowserPath);
    return () => window.removeEventListener("popstate", syncFromBrowserPath);
  }, [groups]);

  const activeEntry = useMemo(() => {
    if (groups?.length) {
      for (const group of groups) {
        if (group.href === activeHref) {
          return { group, item: group };
        }

        const child = findMenuItemByHref(group.children, activeHref);

        if (child) {
          return { group, item: child };
        }
      }

      const fallbackGroup = groups[0];
      const fallbackItem = fallbackGroup?.children?.[0] ?? fallbackGroup;

      return fallbackGroup && fallbackItem
        ? { group: fallbackGroup, item: fallbackItem }
        : null;
    }

    if (!menuContext || !menuContext.tabs?.length) {
      return null;
    }

    const activeTab =
      menuContext.tabs.find((item) => item.href === activeHref) ??
      menuContext.tabs[0] ??
      menuContext.currentItem;

    return {
      group: menuContext.group,
      item: activeTab,
    };
  }, [activeHref, groups, menuContext]);

  if (!activeEntry) {
    return null;
  }

  const group = activeEntry.group;
  const activeItem = activeEntry.item;
  const activeTitle = activeItem?.title || group?.title;
  const activeDescription =
    activeItem?.description ||
    (type === "industry" &&
    (activeItem?.href === group?.href || !(group?.children ?? []).length)
      ? `${activeTitle} is one of the industries submenu items in the navbar.`
      : `${activeTitle} is one of the child menu items under ${group?.title} in the navbar submenu.`);
  const rawDetailContent =
    type === "industry"
      ? getIndustryDetailContent(activeItem?.href)
      : type === "strategy"
        ? getStrategyDetailContent(activeItem?.href)
      : getServiceDetailContent(activeItem?.href);
  const detailContent =
    activeItem?.paragraphs?.length > 0
      ? {
          ...(rawDetailContent || {
            eyebrow: group?.title,
            title: activeTitle,
            summary: activeDescription,
          }),
          paragraphs: activeItem.paragraphs,
        }
      : rawDetailContent;
  /** Strategy-style description surface for Strategy, Services, and Industries */
  const isLightDetailPanel =
    Boolean(detailContent) &&
    (type === "strategy" || type === "industry" || type === "service");
  const isStrategyMenu = type === "strategy";
  const isIndustryMenu = type === "industry";
  const isServiceMenu = type === "service";
  /** Shared sidebar chrome: gradient group row + glass child selection */
  const isPremiumNav = isIndustryMenu || isStrategyMenu || isServiceMenu;
  /** Wider sticky rail + industry scrollbar (service matches Industries) */
  const isWideStickyNav = isIndustryMenu || isServiceMenu;
  const navGroupShellClass = isIndustryMenu
    ? "shrink-0 rounded-[1rem] bg-white/[0.02]"
    : isStrategyMenu
      ? "shrink-0 rounded-[1rem] bg-white/[0.04]"
      : isServiceMenu
        ? "shrink-0 rounded-[1rem] bg-white/[0.02]"
        : "shrink-0 rounded-lg bg-white/5 ring-1 ring-white/[0.04]";
  const navGroupButtonClass = (isGroupHighlighted) => {
    if (isIndustryMenu || isStrategyMenu || isServiceMenu) {
      return isGroupHighlighted
        ? "text-white"
        : "text-gray-off-white/88 hover:bg-white/[0.05] hover:text-white";
    }

    return isGroupHighlighted
      ? "bg-[#e7512f] text-gray-off-white"
      : "text-gray-off-white/88 hover:bg-white/5 hover:text-gray-off-white";
  };
  const navChildButtonClass = (isActive) => {
    if (isIndustryMenu || isStrategyMenu || isServiceMenu) {
      return isActive
        ? "text-white"
        : "text-gray-off-white/76 hover:bg-white/[0.06] hover:text-white";
    }

    return isActive
      ? "bg-[#e7512f] text-gray-off-white"
      : "text-gray-off-white/78 hover:bg-white/5 hover:text-gray-off-white";
  };
  const navChevronClass = (isHighlighted) =>
    isPremiumNav
      ? isHighlighted
        ? "text-white"
        : "text-gray-off-white/70"
      : isHighlighted
        ? "text-gray-off-white"
        : "text-gray-off-white/70";
  const navDotClass = (isActive) =>
    isPremiumNav
      ? isActive
        ? "h-2 w-2 rounded-full bg-white"
        : "h-[1px] w-3 bg-white/35"
      : isActive
        ? "h-[1px] w-3 bg-white/90"
        : "h-[1px] w-3 bg-white/35";
  const navNestedShellClass =
    "overflow-hidden rounded-[0.8rem] bg-white/[0.03]";
  const sidebarViewportStyle = {
    maxHeight: "calc(100vh - 17rem)",
  };
  const sidebarScrollStyle = {
    maxHeight: "calc(100vh - 18rem)",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
    scrollbarGutter: "stable",
  };
  const getTabId = (item) => getItemId(imageAltPrefix, item.title, "tab");
  const getPanelId = (item) => getItemId(imageAltPrefix, item.title, "panel");

  const tabButtonClass = (isActive) =>
    `group relative flex min-h-[3.7rem] w-full cursor-pointer select-none items-center justify-start overflow-hidden rounded-lg px-5 py-3 text-left transition-[color,transform,opacity] duration-300 ease-out ${
      isActive
        ? "text-gray-off-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
        : "text-gray-off-white/82 hover:bg-white/[0.04] hover:text-gray-tradfi-silver"
    }`;

  return (
    <section className="isolate bg-[#1C211E] antialiased">
      <div className="container pb-block pt-24 sm:pt-28 md:pt-12 lg:pt-14">
        <div className="flex flex-col gap-6 lg:min-h-[33rem] xl:min-h-[37rem]">
        {introTitle ? (
          <div className="flex flex-col gap-xl">
            <div className="flex max-w-4xl flex-col gap-sm md:gap-md">
              <h2
                id="a-decentralized-world-needs-strong-governance"
                className="text-balance font-blender text-xl uppercase leading-snug tracking-wide text-green-dark sm:text-2xl"
              >
                {introTitle}
              </h2>
              <div className="text-pretty leading-relaxed text-gray-off-white/90 md:text-[1.05rem] md:leading-relaxed">
                {introDescription}
              </div>
            </div>
            <hr className="border-0 border-t border-[#AB290E]/80" />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10">
          <div
            className={`${hideMenuOnMobile ? "hidden lg:block" : ""} ${isIndustryMenu ? "lg:w-[21rem] xl:w-[22rem]" : isWideStickyNav ? "lg:w-[21rem] xl:w-[22rem]" : "lg:w-[18rem]"} lg:shrink-0`}
          >
            <div
              className={
                isIndustryMenu || isWideStickyNav
                  ? "bg-transparent p-0 shadow-none lg:sticky lg:top-24"
                  : "overflow-x-auto pb-2 lg:h-full lg:overflow-hidden lg:pb-0"
              }
              style={isIndustryMenu || isWideStickyNav ? sidebarViewportStyle : undefined}
            >
              <div
                role="tablist"
                aria-label={`${group?.title} child menu`}
                aria-orientation="vertical"
                className={`flex min-h-0 flex-col gap-2 ${
                  isIndustryMenu || isWideStickyNav
                    ? "pr-1 lg:pr-2 [scrollbar-color:#f05a35_rgba(255,255,255,0.06)] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[0.42rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/[0.05] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#f05a35] [&::-webkit-scrollbar-thumb:hover]:bg-[#ff6b47]"
                    : "h-full overflow-y-auto overscroll-contain pr-1 lg:max-h-[38rem] lg:pr-2 [scrollbar-color:#e7512f_rgba(255,255,255,0.06)] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/[0.05] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#ff7f5f_0%,#e7512f_100%)] [&::-webkit-scrollbar-thumb]:shadow-[0_0_0_1px_rgba(255,255,255,0.06)] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,#ff9477_0%,#f16441_100%)]"
                }`}
                style={isIndustryMenu || isWideStickyNav ? sidebarScrollStyle : undefined}
              >
                {groups?.length
                  ? groups.map((menuGroup) => {
                      const hasChildren = (menuGroup.children ?? []).length > 0;
                      const firstChildHref = menuGroup.children?.[0]?.href ?? "";
                      const isExpanded = expandedGroup === menuGroup.title;
                      const isGroupActive = activeHref === menuGroup.href;
                      const isChildActive = menuTreeHasActiveHref(
                        menuGroup.children,
                        activeHref,
                      );
                      const isGroupHighlighted =
                        isGroupActive || isChildActive || isExpanded;

                      return (
                        <div
                          key={menuGroup.title}
                          className={`overflow-hidden ${navGroupShellClass}`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (hasChildren) {
                                setExpandedGroup((current) =>
                                  current === menuGroup.title
                                    ? ""
                                    : menuGroup.title,
                                );
                                if (!isChildActive) {
                                  selectTab(
                                    (isStrategyMenu || isServiceMenu) &&
                                      firstChildHref
                                      ? firstChildHref
                                      : menuGroup.href,
                                  );
                                }
                                return;
                              }

                              setExpandedGroup(menuGroup.title);
                              selectTab(menuGroup.href);
                            }}
                            className={`relative flex min-h-[3.55rem] w-full shrink-0 items-center justify-between overflow-hidden rounded-[0.95rem] px-4 py-3 text-left transition-colors duration-200 ${navGroupButtonClass(isGroupHighlighted)}`}
                          >
                            {(isIndustryMenu || isStrategyMenu || isServiceMenu) &&
                            isGroupHighlighted ? (
                              <motion.span
                                layoutId={
                                  isIndustryMenu
                                    ? "industry-group-active-pill"
                                    : isStrategyMenu
                                      ? "strategy-group-active-pill"
                                      : "service-group-active-pill"
                                }
                                className="absolute inset-0 rounded-[0.95rem] bg-[linear-gradient(90deg,rgba(231,81,47,0.94),rgba(231,81,47,0.72))]"
                                transition={{
                                  type: "spring",
                                  stiffness: 240,
                                  damping: 26,
                                  mass: 0.9,
                                }}
                              />
                            ) : null}
                            <span
                              className={`relative z-10 pr-4 leading-[1.18] ${
                                isPremiumNav
                                  ? "text-[0.96rem] md:text-[1rem]"
                                  : "text-lg md:text-[1.05rem]"
                              }`}
                            >
                              {menuGroup.title}
                            </span>
                            {hasChildren ? (
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.24, ease: "easeOut" }}
                                className={`shrink-0 text-[0.82rem] ${navChevronClass(isGroupHighlighted)}`}
                              >
                                ▼
                              </motion.span>
                            ) : null}
                          </button>

                          <AnimatePresence initial={false}>
                            {hasChildren && isExpanded ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.28,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div
                                  className={`flex shrink-0 flex-col gap-1 px-2 py-1 ${isPremiumNav ? "pb-2" : ""}`}
                                >
                                  {menuGroup.children.map((item) => {
                                    const nestedItems = item.children?.length
                                      ? item.children
                                      : null;

                                    const renderLeafTab = (node, nested) => {
                                      const isActive = node.href === activeHref;

                                      return (
                                        <button
                                          key={node.href}
                                          id={getTabId(node)}
                                          type="button"
                                          role="tab"
                                          aria-selected={isActive}
                                          aria-controls={getPanelId(node)}
                                          tabIndex={isActive ? 0 : -1}
                                          onClick={() => selectTab(node.href)}
                                          className={`relative flex min-h-[2.8rem] w-full shrink-0 items-center gap-3 overflow-hidden rounded-[0.8rem] py-2 text-left transition ${
                                            nested ? "pl-5 pr-3" : "px-3"
                                          } ${navChildButtonClass(isActive)}`}
                                        >
                                          {(isIndustryMenu ||
                                            isStrategyMenu ||
                                            isServiceMenu) &&
                                          isActive ? (
                                            <motion.span
                                              layoutId={
                                                isIndustryMenu
                                                  ? "industry-child-active-pill"
                                                  : isStrategyMenu
                                                    ? "strategy-child-active-pill"
                                                    : "service-child-active-pill"
                                              }
                                              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))]"
                                              transition={{
                                                type: "spring",
                                                stiffness: 240,
                                                damping: 26,
                                                mass: 0.9,
                                              }}
                                            />
                                          ) : null}
                                          <span
                                            className={`relative z-10 shrink-0 transition ${navDotClass(isActive)}`}
                                          />
                                          <motion.span
                                            className={`relative z-10 leading-[1.2] ${
                                              isPremiumNav
                                                ? "text-[0.8rem] tracking-[0.08em]"
                                                : "text-[0.82rem] uppercase tracking-[0.14em]"
                                            }`}
                                            animate={{
                                              x: isActive ? 4 : 0,
                                              opacity: isActive ? 1 : 0.84,
                                            }}
                                            transition={{
                                              duration: 0.18,
                                              ease: "easeOut",
                                            }}
                                          >
                                            {node.title}
                                          </motion.span>
                                        </button>
                                      );
                                    };

                                    if (nestedItems) {
                                      const nestedOpen =
                                        nestedServiceAccordionHref ===
                                        item.href;
                                      const hasActiveChild = nestedItems.some(
                                        (s) => s.href === activeHref,
                                      );
                                      const isParentActive =
                                        item.href === activeHref;
                                      const parentHighlighted =
                                        isParentActive ||
                                        hasActiveChild ||
                                        nestedOpen;

                                      return (
                                        <div
                                          key={item.href}
                                          className={navNestedShellClass}
                                        >
                                          <button
                                            type="button"
                                            aria-expanded={nestedOpen}
                                            onClick={() =>
                                              setNestedServiceAccordionHref(
                                                (prev) =>
                                                  prev === item.href
                                                    ? ""
                                                    : item.href,
                                              )
                                            }
                                            className={`relative flex min-h-[2.8rem] w-full shrink-0 items-center justify-between gap-2 overflow-hidden rounded-[0.8rem] px-3 py-2 text-left transition ${navChildButtonClass(parentHighlighted)}`}
                                          >
                                            {(isIndustryMenu ||
                                              isStrategyMenu ||
                                              isServiceMenu) &&
                                            parentHighlighted ? (
                                              <span className="absolute inset-0 rounded-[0.8rem] bg-[linear-gradient(90deg,rgba(231,81,47,0.94),rgba(231,81,47,0.72))]" />
                                            ) : null}
                                            <span
                                              className={`relative z-10 leading-[1.2] ${
                                                isPremiumNav
                                                  ? "text-[0.8rem] tracking-[0.08em]"
                                                  : "text-[0.82rem] uppercase tracking-[0.14em]"
                                              }`}
                                            >
                                              {item.title}
                                            </span>
                                            <motion.span
                                              animate={{
                                                rotate: nestedOpen ? 180 : 0,
                                              }}
                                              transition={{
                                                duration: 0.22,
                                                ease: "easeOut",
                                              }}
                                              className={`relative z-10 shrink-0 text-[0.72rem] ${navChevronClass(parentHighlighted)}`}
                                              aria-hidden
                                            >
                                              ▼
                                            </motion.span>
                                          </button>

                                          <AnimatePresence initial={false}>
                                            {nestedOpen ? (
                                              <motion.div
                                                initial={{
                                                  height: 0,
                                                  opacity: 0,
                                                }}
                                                animate={{
                                                  height: "auto",
                                                  opacity: 1,
                                                }}
                                                exit={{
                                                  height: 0,
                                                  opacity: 0,
                                                }}
                                                transition={{
                                                  duration: 0.26,
                                                  ease: [0.22, 1, 0.36, 1],
                                                }}
                                                className="overflow-hidden"
                                              >
                                                <div className="flex flex-col gap-1 px-1 pb-1.5 pt-0.5">
                                                  {nestedItems.map((sub) =>
                                                    renderLeafTab(sub, true),
                                                  )}
                                                </div>
                                              </motion.div>
                                            ) : null}
                                          </AnimatePresence>
                                        </div>
                                      );
                                    }

                                    return renderLeafTab(item, false);
                                  })}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  : menuContext.tabs.map((item) => {
                      const isActive = item.href === activeHref;
                      const tabId = getTabId(item);
                      const panelId = getPanelId(item);

                      return (
                        <button
                          key={item.href}
                          id={tabId}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls={panelId}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => selectTab(item.href)}
                          className={tabButtonClass(isActive)}
                        >
                          {isActive ? (
                            <motion.span
                              layoutId="content-tab-active-pill"
                              className="absolute inset-0 bg-[#e7512f]"
                              transition={{
                                type: "spring",
                                stiffness: 240,
                                damping: 26,
                                mass: 0.9,
                              }}
                            />
                          ) : null}
                          <motion.span
                            className="relative z-10"
                            animate={{
                              x: isActive ? 6 : 0,
                              opacity: isActive ? 1 : 0.84,
                            }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                          >
                            {item.title}
                          </motion.span>
                        </button>
                      );
                    })}
              </div>
            </div>
          </div>

          <div className="relative flex min-w-0 flex-1 lg:min-h-[33rem]">
            <div
              className={`flex min-h-0 flex-1 flex-col overflow-hidden md:h-full ${
                detailContent
                  ? isLightDetailPanel
                    ? "bevel"
                    : "bevel shadow-[0_28px_64px_-10px_rgba(0,0,0,0.28)]"
                  : `bevel md:flex-row-reverse ${panelClassName} shadow-[0_28px_64px_-10px_rgba(0,0,0,0.28)]`
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeHref}
                  id={getPanelId(activeItem)}
                  role="tabpanel"
                  aria-labelledby={getTabId(activeItem)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex min-h-0 flex-1 flex-col"
                >
              {!detailContent ? (
                <div className="h-[16rem] bevel sm:h-[18rem] lg:h-full lg:flex-1 relative">
                  <Image
                    alt={activeDescription}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ color: "transparent" }}
                    src={imageSrc}
                  />
                </div>
              ) : null}
              <div
                className={`flex flex-col ${
                  detailContent
                    ? "h-full min-h-0 p-0"
                    : "justify-end px-4 py-6 sm:px-5 lg:flex-1 lg:px-6"
                } text-gray-night-green`}
              >
                {detailContent ? (
                  <div
                    className={`flex h-full min-h-0 flex-col overflow-y-auto ${
                      isLightDetailPanel ? "" : "lg:max-h-[38rem]"
                    } ${
                      isLightDetailPanel
                        ? "bg-[#E7ECE3]"
                        : "bg-gray-defi-charcoal/95"
                    } [scrollbar-color:#e7512f_rgba(255,255,255,0.06)] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/[0.05] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#ff7f5f_0%,#e7512f_100%)] [&::-webkit-scrollbar-thumb]:shadow-[0_0_0_1px_rgba(255,255,255,0.06)] [&::-webkit-scrollbar-thumb:hover]:bg-[linear-gradient(180deg,#ff9477_0%,#f16441_100%)]`}
                  >
                    <div
                      className={`px-5 py-6 md:px-7 md:py-7 ${
                        isLightDetailPanel
                          ? "border-b border-black/10 bg-gradient-to-r from-black/[0.03] to-transparent"
                          : "border-b border-white/10 bg-gradient-to-r from-white/[0.07] to-transparent"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-blender text-[0.7rem] uppercase tracking-[0.22em] text-green-dark">
                          {detailContent.eyebrow}
                        </span>
                        <span className="h-px w-11 shrink-0 bg-[#e7512f]/95" />
                      </div>

                      <div className="mt-5 flex flex-col gap-4 md:mt-6">
                        <h3
                          className={`max-w-3xl text-balance font-blender text-[1.25rem] uppercase leading-[1.08] tracking-[0.01em] md:text-[2.05rem] ${
                            isLightDetailPanel
                              ? "text-gray-night-green"
                              : "text-gray-off-white"
                          }`}
                        >
                          {detailContent.title}
                        </h3>
                        <div className="relative h-px w-full max-w-2xl bg-black/35">
                          <span className="absolute left-0 top-1/2 h-0.5 w-16 -translate-y-1/2 rounded-full bg-[#e7512f]" />
                        </div>
                        <p
                          className={`max-w-[44rem] text-pretty text-[0.98rem] leading-[1.7] md:text-[1.04rem] md:leading-[1.72] ${
                            isLightDetailPanel
                              ? "text-gray-night-green/88"
                              : "text-gray-off-white/88"
                          }`}
                        >
                          {detailContent.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col px-5 py-6 md:px-7 md:py-7">
                      <div className="min-h-0 flex-1 pr-1 md:pr-2">
                        <div
                          className={`space-y-6 text-[0.98rem] leading-[1.7] tracking-[0.01em] md:text-[1.02rem] md:leading-[1.72] ${
                            isLightDetailPanel
                              ? "text-gray-night-green/85"
                              : "text-gray-off-white/85"
                          }`}
                        >
                          {detailContent.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="max-w-[46rem]">
                              {paragraph}
                            </p>
                          ))}

                          {detailContent.sections?.length ? (
                            <div className="space-y-4 pt-3">
                              {detailContent.sections.map((section) => (
                                <div
                                  key={section.title}
                                  className={`rounded-[0.95rem] px-4 py-4 transition-shadow duration-200 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] md:px-5 md:py-5 ${
                                    isLightDetailPanel
                                      ? "border border-black/10 bg-black/[0.02] hover:border-black/15"
                                      : "border border-white/10 bg-white/[0.04] hover:border-white/15"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <span className="mt-[0.72rem] h-2 w-2 shrink-0 rounded-full bg-[#e7512f]" />
                                    <div className="min-w-0">
                                      {section.title ? (
                                        <h4
                                          className={`text-[1rem] font-medium leading-7 tracking-[0.01em] md:text-[1.12rem] ${
                                            isLightDetailPanel
                                              ? "text-gray-night-green"
                                              : "text-gray-off-white"
                                          }`}
                                        >
                                          {section.title}
                                        </h4>
                                      ) : null}
                                      {section.body ? (
                                        <p
                                          className={`mt-2 max-w-[42rem] text-[0.95rem] leading-8 md:text-[1rem] ${
                                            isLightDetailPanel
                                              ? "text-gray-night-green/78"
                                              : "text-gray-off-white/78"
                                          }`}
                                        >
                                          {section.body}
                                        </p>
                                      ) : null}
                                      {section.bullets?.length ? (
                                        <div
                                          className={`mt-3 space-y-3.5 text-[0.95rem] leading-8 md:text-[1rem] ${
                                            isLightDetailPanel
                                              ? "text-gray-night-green/78"
                                              : "text-gray-off-white/78"
                                          }`}
                                        >
                                          {section.bullets.map((bullet) => (
                                            <div
                                              key={bullet}
                                              className="flex items-start gap-3"
                                            >
                                              <span className="mt-[0.72rem] h-2 w-2 shrink-0 rounded-full bg-[#e7512f]" />
                                              <p className="max-w-[42rem]">
                                                {bullet}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {detailContent.closing ? (
                            <div
                              className={`max-w-[46rem] pt-6 ${
                                isLightDetailPanel
                                  ? "border-t border-black/10"
                                  : "border-t border-white/10"
                              } ${detailContent.closingHref ? "flex justify-center" : ""}`}
                            >
                              {detailContent.closingHref ? (
                                <Link
                                  href={detailContent.closingHref}
                                  className="group/cta inline-flex items-center gap-3 rounded-md bg-[#E7512F] px-6 py-3.5 text-sm font-semibold uppercase italic tracking-wide text-white shadow-[0_10px_28px_rgba(231,81,47,0.35)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#f06543] hover:shadow-[0_14px_34px_rgba(231,81,47,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 motion-reduce:transform-none"
                                >
                                  <span>{detailContent.closing}</span>
                                  <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-base leading-none transition group-hover/cta:bg-white/25"
                                    aria-hidden
                                  >
                                    →
                                  </span>
                                </Link>
                              ) : (
                                <div
                                  className={`whitespace-pre-line text-[0.96rem] leading-[1.7] md:text-[1rem] md:leading-relaxed ${
                                    isLightDetailPanel
                                      ? "text-gray-night-green/78"
                                      : "text-gray-off-white/78"
                                  }`}
                                >
                                  {detailContent.closing}
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm md:text-xl">{activeDescription}</div>
                    <div className="mt-4 text-xs uppercase tracking-[0.18em] opacity-80">
                      {group?.title}
                    </div>
                  </>
                )}
              </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
