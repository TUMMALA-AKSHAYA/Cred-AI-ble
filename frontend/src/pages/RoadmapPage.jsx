import React from 'react';
import { Button, Card, Container, Badge } from '../components';
import { useQuiz } from '../hooks/useQuiz';

export const RoadmapPage = ({ onBack }) => {
  const { results, domainResults } = useQuiz();

  if (!results || !results[0]) return null;

  const career = results[0].career;

  // Roadmap data for each career
  const roadmaps = {
    "AI/Machine Learning": {
      phases: [
        {
          phase: 1,
          title: "Foundations (0-3 months)",
          duration: "3 months",
          focus: ["Python Programming", "Mathematics", "Statistics"],
          resources: [
            { type: "Course", name: "Python for Data Science", platform: "Coursera", hours: "40 hrs" },
            { type: "Course", name: "Linear Algebra", platform: "MIT OCW", hours: "60 hrs" },
            { type: "Book", name: "Think Stats by Allen Downey", platform: "O'Reilly", hours: "30 hrs" },
          ],
          projects: [
            "Build a data analysis dashboard",
            "Create statistical visualization toolkit"
          ]
        },
        {
          phase: 2,
          title: "Core ML Skills (3-6 months)",
          duration: "3 months",
          focus: ["Supervised Learning", "Neural Networks", "TensorFlow/PyTorch"],
          resources: [
            { type: "Course", name: "Machine Learning Specialization", platform: "DeepLearning.AI", hours: "80 hrs" },
            { type: "Course", name: "Deep Learning", platform: "Fast.ai", hours: "100 hrs" },
            { type: "Project", name: "Kaggle Competitions", platform: "Kaggle", hours: "50 hrs" },
          ],
          projects: [
            "Build an image classification model",
            "Create a sentiment analysis system",
            "Participate in 3 Kaggle competitions"
          ]
        },
        {
          phase: 3,
          title: "Advanced Topics (6-12 months)",
          duration: "6 months",
          focus: ["NLP", "Computer Vision", "Model Deployment"],
          resources: [
            { type: "Course", name: "Advanced NLP with Transformers", platform: "Hugging Face", hours: "60 hrs" },
            { type: "Course", name: "MLOps Specialization", platform: "Coursera", hours: "40 hrs" },
            { type: "Practice", name: "Build Production ML Systems", platform: "Self", hours: "200 hrs" },
          ],
          projects: [
            "Deploy an ML model to production",
            "Build a recommendation system",
            "Create an NLP application"
          ]
        }
      ],
      skills: {
        strong: ["Python Basics", "Mathematical Thinking"],
        weak: ["Deep Learning", "Model Deployment", "Statistics"]
      },
      certifications: [
        "TensorFlow Developer Certificate",
        "AWS Machine Learning Specialty",
        "Google Cloud ML Engineer"
      ]
    },
    "Web Development": {
      phases: [
        {
          phase: 1,
          title: "Frontend Fundamentals (0-2 months)",
          duration: "2 months",
          focus: ["HTML/CSS", "JavaScript ES6+", "Responsive Design"],
          resources: [
            { type: "Course", name: "The Complete JavaScript Course", platform: "Udemy", hours: "50 hrs" },
            { type: "Course", name: "CSS for Developers", platform: "Frontend Masters", hours: "30 hrs" },
            { type: "Practice", name: "Frontend Mentor Challenges", platform: "Frontend Mentor", hours: "40 hrs" },
          ],
          projects: [
            "Build 5 responsive landing pages",
            "Create an interactive portfolio",
            "Build a JavaScript game"
          ]
        },
        {
          phase: 2,
          title: "Modern Frameworks (2-5 months)",
          duration: "3 months",
          focus: ["React", "Next.js", "State Management"],
          resources: [
            { type: "Course", name: "React - The Complete Guide", platform: "Udemy", hours: "60 hrs" },
            { type: "Course", name: "Next.js Mastery", platform: "Frontend Masters", hours: "40 hrs" },
            { type: "Documentation", name: "Official React Docs", platform: "React.dev", hours: "20 hrs" },
          ],
          projects: [
            "Build a full-stack blog with Next.js",
            "Create a real-time chat application",
            "Build an e-commerce frontend"
          ]
        },
        {
          phase: 3,
          title: "Full Stack & DevOps (5-12 months)",
          duration: "7 months",
          focus: ["Node.js/Backend", "Databases", "CI/CD"],
          resources: [
            { type: "Course", name: "Node.js Developer Course", platform: "Udemy", hours: "80 hrs" },
            { type: "Course", name: "PostgreSQL Bootcamp", platform: "Udemy", hours: "40 hrs" },
            { type: "Practice", name: "Build & Deploy Projects", platform: "Vercel/Railway", hours: "150 hrs" },
          ],
          projects: [
            "Build a full-stack SaaS application",
            "Create a REST API with authentication",
            "Deploy production-ready applications"
          ]
        }
      ],
      skills: {
        strong: ["HTML/CSS", "UI Design Sense"],
        weak: ["Backend Development", "Database Design", "Testing"]
      },
      certifications: [
        "Meta Front-End Developer Certificate",
        "AWS Certified Developer",
        "Google UX Design Certificate"
      ]
    },
    "Backend Engineering": {
      phases: [
        {
          phase: 1,
          title: "Programming & Databases (0-3 months)",
          duration: "3 months",
          focus: ["Python/Node.js", "SQL", "REST APIs"],
          resources: [
            { type: "Course", name: "Complete Backend Development", platform: "Udemy", hours: "60 hrs" },
            { type: "Course", name: "Database Design & SQL", platform: "Coursera", hours: "40 hrs" },
            { type: "Practice", name: "LeetCode SQL Problems", platform: "LeetCode", hours: "30 hrs" },
          ],
          projects: [
            "Build a RESTful API",
            "Create a database schema for e-commerce",
            "Implement authentication system"
          ]
        },
        {
          phase: 2,
          title: "System Design & Architecture (3-8 months)",
          duration: "5 months",
          focus: ["Microservices", "Caching", "Message Queues"],
          resources: [
            { type: "Course", name: "System Design Interview", platform: "Educative", hours: "50 hrs" },
            { type: "Course", name: "Microservices Architecture", platform: "Udemy", hours: "40 hrs" },
            { type: "Book", name: "Designing Data-Intensive Applications", platform: "O'Reilly", hours: "80 hrs" },
          ],
          projects: [
            "Build a scalable API gateway",
            "Implement caching with Redis",
            "Create a message queue system"
          ]
        },
        {
          phase: 3,
          title: "Cloud & DevOps (8-12 months)",
          duration: "4 months",
          focus: ["AWS/GCP", "Kubernetes", "CI/CD"],
          resources: [
            { type: "Course", name: "AWS Solutions Architect", platform: "A Cloud Guru", hours: "60 hrs" },
            { type: "Course", name: "Kubernetes for Developers", platform: "Udemy", hours: "40 hrs" },
            { type: "Practice", name: "Deploy Production Systems", platform: "AWS/GCP", hours: "100 hrs" },
          ],
          projects: [
            "Deploy microservices on Kubernetes",
            "Build a CI/CD pipeline",
            "Create auto-scaling infrastructure"
          ]
        }
      ],
      skills: {
        strong: ["Problem Solving", "Logical Thinking"],
        weak: ["System Design", "Cloud Architecture", "Kubernetes"]
      },
      certifications: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
        "Kubernetes Application Developer"
      ]
    },
    "Data Science": {
      phases: [
        {
          phase: 1,
          title: "Statistics & Python (0-3 months)",
          duration: "3 months",
          focus: ["Python", "Statistics", "Data Manipulation"],
          resources: [
            { type: "Course", name: "Python for Data Science", platform: "DataCamp", hours: "50 hrs" },
            { type: "Course", name: "Statistics Fundamentals", platform: "Khan Academy", hours: "40 hrs" },
            { type: "Course", name: "Pandas & NumPy Mastery", platform: "Coursera", hours: "30 hrs" },
          ],
          projects: [
            "Analyze a real-world dataset",
            "Create data visualizations",
            "Build a data cleaning pipeline"
          ]
        },
        {
          phase: 2,
          title: "Machine Learning (3-7 months)",
          duration: "4 months",
          focus: ["ML Algorithms", "Feature Engineering", "Model Evaluation"],
          resources: [
            { type: "Course", name: "Machine Learning A-Z", platform: "Udemy", hours: "80 hrs" },
            { type: "Course", name: "Feature Engineering", platform: "Coursera", hours: "30 hrs" },
            { type: "Practice", name: "Kaggle Competitions", platform: "Kaggle", hours: "100 hrs" },
          ],
          projects: [
            "Build predictive models",
            "Win a Kaggle competition",
            "Create a recommendation engine"
          ]
        },
        {
          phase: 3,
          title: "Advanced Analytics (7-12 months)",
          duration: "5 months",
          focus: ["Deep Learning", "Big Data", "MLOps"],
          resources: [
            { type: "Course", name: "Deep Learning Specialization", platform: "DeepLearning.AI", hours: "80 hrs" },
            { type: "Course", name: "Spark & Big Data", platform: "Udemy", hours: "40 hrs" },
            { type: "Practice", name: "End-to-end ML Projects", platform: "Self", hours: "150 hrs" },
          ],
          projects: [
            "Build a deep learning model",
            "Process big data with Spark",
            "Deploy ML models to production"
          ]
        }
      ],
      skills: {
        strong: ["Data Analysis", "Python Basics"],
        weak: ["Machine Learning", "Big Data Tools", "Deep Learning"]
      },
      certifications: [
        "Google Data Analytics Certificate",
        "IBM Data Science Professional",
        "Microsoft Certified: Azure Data Scientist"
      ]
    },
    "UI/UX Design": {
      phases: [
        {
          phase: 1,
          title: "Design Fundamentals (0-2 months)",
          duration: "2 months",
          focus: ["Design Principles", "Figma", "Color Theory"],
          resources: [
            { type: "Course", name: "UI/UX Design Bootcamp", platform: "Udemy", hours: "40 hrs" },
            { type: "Course", name: "Figma Masterclass", platform: "Figma Learn", hours: "20 hrs" },
            { type: "Practice", name: "Daily UI Challenges", platform: "Daily UI", hours: "60 hrs" },
          ],
          projects: [
            "Design 30 UI components",
            "Create a mobile app design",
            "Build a design system"
          ]
        },
        {
          phase: 2,
          title: "User Research & Prototyping (2-5 months)",
          duration: "3 months",
          focus: ["User Research", "Wireframing", "Prototyping"],
          resources: [
            { type: "Course", name: "UX Research Methods", platform: "Coursera", hours: "30 hrs" },
            { type: "Course", name: "Advanced Prototyping", platform: "Interaction Design Foundation", hours: "40 hrs" },
            { type: "Practice", name: "Real Client Projects", platform: "Upwork", hours: "80 hrs" },
          ],
          projects: [
            "Conduct user research study",
            "Create interactive prototypes",
            "Design for 3 real clients"
          ]
        },
        {
          phase: 3,
          title: "Advanced Design & Portfolio (5-12 months)",
          duration: "7 months",
          focus: ["Motion Design", "Design Systems", "Portfolio"],
          resources: [
            { type: "Course", name: "Motion Design for UI", platform: "School of Motion", hours: "50 hrs" },
            { type: "Course", name: "Design Systems", platform: "Figma", hours: "30 hrs" },
            { type: "Practice", name: "Build Portfolio", platform: "Self", hours: "100 hrs" },
          ],
          projects: [
            "Create micro-interactions",
            "Build a complete design system",
            "Design 10 portfolio-worthy projects"
          ]
        }
      ],
      skills: {
        strong: ["Visual Design", "Color Theory"],
        weak: ["User Research", "Prototyping", "Accessibility"]
      },
      certifications: [
        "Google UX Design Certificate",
        "Nielsen Norman Group UX Certification",
        "Interaction Design Foundation Certificate"
      ]
    }
  };

  const roadmap = roadmaps[career] || roadmaps["Web Development"];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-20">
      <Container>
        {/* Header */}
        <div className="mb-16">
          <Button variant="secondary" onClick={onBack} className="mb-8">
            ← Back to Dashboard
          </Button>

          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" icon="🗺️" className="mb-6">Your Personalized Roadmap</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              {career}
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Learning Roadmap
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Your 12-month journey from beginner to job-ready professional
            </p>
          </div>
        </div>

        {/* Skills Assessment Summary */}
        <div className="mb-16">
          <Card variant="glass" className="border-2 border-indigo-500/20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Skill Analysis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">💪</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Strengths</h3>
                </div>
                <div className="space-y-2">
                  {roadmap.skills.strong.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge variant="success" icon="✓">{skill}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🎯</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Focus Areas</h3>
                </div>
                <div className="space-y-2">
                  {roadmap.skills.weak.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge variant="warning" icon="⚡">{skill}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Phases */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Learning Path</h2>
          <div className="space-y-8">
            {roadmap.phases.map((phase) => (
              <Card key={phase.phase} variant="default" className="relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
                {/* Phase gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-transparent group-hover:from-indigo-500/5 group-hover:via-violet-500/5 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
                          {phase.phase}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{phase.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{phase.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">FOCUS AREAS</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.focus.map((item, idx) => (
                        <Badge key={idx} variant="primary">{item}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">RECOMMENDED RESOURCES</h4>
                    <div className="space-y-3">
                      {phase.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {resource.type === 'Course' ? '📚' : resource.type === 'Book' ? '📖' : resource.type === 'Practice' ? '💻' : '📝'}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{resource.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{resource.platform}</p>
                            </div>
                          </div>
                          <Badge variant="teal">{resource.hours}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">PROJECTS TO BUILD</h4>
                    <ul className="space-y-2">
                      {phase.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-indigo-600 dark:text-indigo-400 mt-1">▸</span>
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Recommended Certifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.certifications.map((cert, idx) => (
              <Card key={idx} variant="gradient" className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <p className="font-semibold text-white">{cert}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <Card variant="glass" className="text-center border-2 border-indigo-500/20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Save this roadmap and begin with Phase 1 today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Download Roadmap PDF
            </Button>
            <Button variant="secondary" size="lg">
              Share on LinkedIn
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};
