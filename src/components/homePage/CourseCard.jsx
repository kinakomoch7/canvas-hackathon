import { Card } from "../ui/card";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem  } from "../ui/accordion";

const CourseCard = (props) => {

  const { course } = props;

  const formatDate = (date) => {
    if (date == null) {
      return "未設定";
    }
    const dueDate = new Date(date);
    return `${dueDate.getFullYear()}/${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
  }

  return (
    <Card key={course.courseId} className="m-3 p-5 min-w-72">
      <div className="text-md font-semibold">{course.courseName}</div>
      <div className="flex justify-between">
        <p>採点済み点数: {course.sumScore} / {course.sumFullAlreadyScored}</p>
        <p>最大点: {course.sumFullScore}</p>
      </div>

      <p>提出率: {course.submissionPercentage < 0 ? "課題がありません" : `${course.submissionPercentage}%`}</p>
      {(course.details.length == 0) ? <></> :
      <Accordion key={course.courseId} type="single" collapsible>
      <AccordionItem value={course.courseName} >
        <AccordionTrigger>課題ごとの詳細</AccordionTrigger>
        <AccordionContent>
          {(course.details.length == 0)?
            <p>課題がありません</p>
          :null}
          <ul>
            {course.details.map((detail) => (
              <li key={detail.id} className="mt-2 mb-2 border-b-2">
                <div className="font-medium">{detail.name}</div>
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                  <div className="flex">スコア:  {detail.score ? `${detail.score}/${detail.fullScore}` : <div className="text-red-600">採点されてません</div>}</div>
                  <p>{detail.isSubmitted ? <div className="text-green-500">提出済</div> : <div className="text-red-500">未提出</div>}</p>
                </div>
                <p>締め切り日: {formatDate(detail.submittedDueDate)}</p>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    }

    </Card>
  )
}

export default CourseCard