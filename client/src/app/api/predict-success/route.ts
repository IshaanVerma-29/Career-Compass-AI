import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { examType, studyHours, previousScores, timeToExam, subjects } = await request.json();

    // Success prediction algorithm
    const calculateSuccessProbability = () => {
      let baseScore = 0;
      
      // Study hours factor (0-40 points)
      baseScore += Math.min(studyHours * 2, 40);
      
      // Previous performance (0-30 points)
      const avgScore = previousScores.reduce((a: number, b: number) => a + b, 0) / previousScores.length;
      baseScore += (avgScore / 100) * 30;
      
      // Time preparation factor (0-20 points)
      if (timeToExam >= 6) baseScore += 20;
      else if (timeToExam >= 3) baseScore += 15;
      else baseScore += 10;
      
      // Subject coverage (0-10 points)
      baseScore += Math.min(subjects.length * 2, 10);
      
      return Math.min(Math.round(baseScore), 95);
    };

    const successProbability = calculateSuccessProbability();
    
    const recommendations = [];
    if (successProbability < 60) {
      recommendations.push("Increase daily study hours to 8-10 hours");
      recommendations.push("Focus on weak subjects and take targeted practice");
      recommendations.push("Take more mock tests to improve performance");
      recommendations.push("Consider joining coaching or online courses");
    } else if (successProbability < 80) {
      recommendations.push("Maintain current study schedule");
      recommendations.push("Focus on time management during exams");
      recommendations.push("Practice previous year papers");
    } else {
      recommendations.push("Excellent preparation! Maintain consistency");
      recommendations.push("Focus on advanced problem solving");
      recommendations.push("Help others to reinforce your knowledge");
    }

    return NextResponse.json({
      successProbability,
      examType,
      recommendations,
      breakdown: {
        studyEffort: Math.min(studyHours * 2, 40),
        pastPerformance: (previousScores.reduce((a: number, b: number) => a + b, 0) / previousScores.length / 100) * 30,
        timePreparation: timeToExam >= 6 ? 20 : timeToExam >= 3 ? 15 : 10,
        subjectCoverage: Math.min(subjects.length * 2, 10)
      },
      message: `Based on your preparation, you have a ${successProbability}% chance of success in ${examType}`
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: 'Failed to predict success' }, { status: 500 });
  }
}
