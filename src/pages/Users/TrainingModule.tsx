import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TrainingDescription from "../../components/TrainingDescription";
import TrainingModules from "../../components/TrainingModules";
import { useTabs } from "../../utils/TabContext";
import VideoPlayer from "../../components/VideoPlayers";
import NotifyModal from "../../components/NotifyModal";
import { useTrainingStore } from "../../store/useTraining";

// New components for different content types
const PDFViewer = ({ pdfUrl }: any) => {
  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <object data={pdfUrl} type="application/pdf" className="w-full h-full">
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
          <p className="text-gray-700 mb-4">
            Your browser doesn't support PDF viewing.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </object>
    </div>
  );
};

const TextAndImageContent = ({ content }: any) => {
  // Check if content is base64 image
  const isImage =
    content &&
    (content.startsWith("data:image") ||
      content.includes("/9j/") ||
      content.includes("iVBOR"));

  if (isImage) {
    return (
      <div className="mt-4">
        <img
          src={content}
          alt="Lesson content"
          className="max-w-full rounded-lg shadow-md"
        />
      </div>
    );
  }

  // Otherwise treat as HTML content
  const decodedContent = content
    ? content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    : "";

  return (
    <div className="mt-4 prose prose-sm max-w-none bg-white p-6 rounded-lg shadow-sm">
      <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
    </div>
  );
};

// Component to determine which content viewer to show
const ContentViewer = ({ lesson }: any) => {
  const lessonType = lesson?.lessonType?.toLowerCase();

  switch (lessonType) {
    case "video":
    case "link":
      return <VideoPlayer />;
    case "document":
      return <PDFViewer pdfUrl={lesson.content} />;
    case "text-&-image":
      return <TextAndImageContent content={lesson.content} />;
    default:
      return (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded">
          Unsupported lesson type: {lessonType}
        </div>
      );
  }
};

// Navigation breadcrumb component
interface BreadcrumbProps {
  currentTraining: {
    title: string;
  };
}

const Breadcrumb = ({ currentTraining }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-medium mb-6">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        Dashboard
      </Link>
      <span className="text-gray-400">/</span>
      <Link
        to="/training"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        Training
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">{currentTraining?.title}</span>
    </nav>
  );
};

const TrainingModule = () => {
  const { activeTab, currentLesson } = useTabs();
  const { currentTraining, isLoading, getAllTrainings } = useTrainingStore();

  useEffect(() => {
    console.log("Current lesson:", currentLesson);
  }, [currentLesson]);

  if (isLoading || !currentTraining) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="font-poppins relative w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb currentTraining={currentTraining} />

        {/* Banner section - only shown on the description tab */}
        {activeTab === 0 && (
          <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
              <div className="text-gray-800 mb-6 md:mb-0">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl max-w-md">
                  {currentTraining?.title}
                </h1>
                <div className="flex items-center mt-4">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentTraining?.modules.length} modules
                  </div>
                  {/* Estimated time could be calculated or fetched from API */}
                  {/* <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                    Est. {Math.ceil(currentTraining?.modules.length * 1.5)}{" "}
                    hours
                  </div> */}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="w-full md:w-80 h-48 overflow-hidden rounded-xl shadow-md transform transition-transform hover:scale-105">
                  <img
                    className="w-full h-full object-cover"
                    src={currentTraining.bannerImage}
                    alt={`${currentTraining.title} banner`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress indicator - only shown when viewing a lesson */}
        {/* {activeTab !== 0 && currentLesson && (
          <ProgressIndicator
            currentTraining={currentTraining}
            currentLesson={currentLesson}
          />
        )} */}

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full  bg-white rounded-xl shadow-sm">
            {activeTab === 0 ? (
              <TrainingDescription currentTraining={currentTraining} />
            ) : currentLesson ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  {currentLesson.lessonTitle}
                </h1>

                {/* Use the ContentViewer component to display appropriate content */}
                <ContentViewer lesson={currentLesson} />

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500 font-medium">Type</p>
                      <p className="text-gray-700">
                        {currentLesson.lessonType.charAt(0).toUpperCase() +
                          currentLesson.lessonType.slice(1)}
                      </p>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500 font-medium">
                        Status
                      </p>
                      {currentLesson.lessonProgress.completionStatus ===
                      "completed" ? (
                        <p className="text-green-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Completed
                        </p>
                      ) : currentLesson.lessonProgress.completionStatus ===
                        "in-progress" ? (
                        <p className="text-blue-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          In Progress
                        </p>
                      ) : (
                        <p className="text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Not Started
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <TrainingDescription currentTraining={currentTraining} />
            )}
          </div>

          <div className="w-full ">
            <div className="bg-white rounded-xl shadow-sm sticky top-6">
              <TrainingModules currentTraining={currentTraining} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
