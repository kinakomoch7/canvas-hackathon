'use client'
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem  } from "../ui/accordion";
import CourseCard from "./CourseCard";

const CoursesPercentage = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/scores`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data || data == undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin:50, display:"flex", flexWrap:"wrap" }}>
      {data.map((course) => (
        <CourseCard key={course.courseId} course={course} />
      ))}

    </div>
  );
};

export default CoursesPercentage;
