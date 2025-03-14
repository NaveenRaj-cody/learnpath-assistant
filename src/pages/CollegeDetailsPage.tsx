
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, GraduationCap, Award, Users, Briefcase, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CollegeDetailsPage = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  
  useEffect(() => {
    if (collegeName) {
      const decodedCollegeName = decodeURIComponent(collegeName);
      const allColleges = coursesData.flatMap(course => course.topColleges);
      const foundCollege = allColleges.find(c => c.name === decodedCollegeName);
      
      if (foundCollege) {
        setCollege(foundCollege);
      }
    }
  }, [collegeName]);

  const getCoursesForCollege = (collegeName: string) => {
    return coursesData.filter(course => 
      course.topColleges.some(college => college.name === collegeName)
    );
  };

  const getPlacementDetails = (collegeName: string) => {
    return {
      averageSalary: "₹8.5 LPA",
      highestSalary: "₹42 LPA",
      placementRate: "92%",
      topRecruiters: ["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Wipro"],
      trendChart: {
        years: ["2019", "2020", "2021", "2022", "2023"],
        placements: [85, 88, 90, 91, 92]
      }
    };
  };

  const getCollegeAchievements = (collegeName: string) => {
    return [
      "Ranked #1 in Engineering by NIRF 2023",
      "Awarded 'Institution of Excellence' by UGC",
      "Research collaboration with MIT and Stanford",
      "Established Center for Innovation and Entrepreneurship",
      "3 patents granted in the last year",
      "Winner of Smart India Hackathon 2022"
    ];
  };

  const getNotableAlumni = (collegeName: string) => {
    return [
      {
        name: "Sundar Pichai",
        position: "CEO of Google",
        batch: "1993",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sundar_Pichai_%282023%29_cropped.jpg/440px-Sundar_Pichai_%282023%29_cropped.jpg", 
        bio: "Pichai Sundararajan, better known as Sundar Pichai, is an Indian-American business executive. He is the chief executive officer of Alphabet Inc. and its subsidiary Google. Born in Madurai, India, Pichai earned his degree from IIT Kharagpur in metallurgical engineering."
      },
      {
        name: "Satya Nadella",
        position: "CEO of Microsoft",
        batch: "1988",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Satya_Nadella_%28cropped%29.jpg/440px-Satya_Nadella_%28cropped%29.jpg",
        bio: "Satya Narayana Nadella is an Indian-American business executive. He is the executive chairman and CEO of Microsoft, succeeding Steve Ballmer as CEO in 2014, and John W. Thompson as chairman in 2021. Before becoming CEO, he was the executive vice president of Microsoft's cloud and enterprise group."
      },
      {
        name: "N. R. Narayana Murthy",
        position: "Co-founder of Infosys",
        batch: "1969",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Narayana_Murthy.jpg/440px-Narayana_Murthy.jpg",
        bio: "Nagavara Ramarao Narayana Murthy is an Indian billionaire businessman. He is the co-founder of Infosys, and has been the chairman, chief executive officer, president, and chief mentor of the company before retiring and taking the title chairman emeritus."
      },
      {
        name: "Nandan Nilekani",
        position: "Co-founder of Infosys",
        batch: "1978",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Nandan_Nilekani_-_World_Economic_Forum_Annual_Meeting_2011.jpg/440px-Nandan_Nilekani_-_World_Economic_Forum_Annual_Meeting_2011.jpg",
        bio: "Nandan Nilekani is an Indian entrepreneur, bureaucrat, and politician. He co-founded Infosys and is the non-executive chairman of the company. He was the chairman of the Unique Identification Authority of India (UIDAI). After a successful career at Infosys, he headed the Government of India's technology committee."
      }
    ];
  };

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <AnimatedTransition>
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Building className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h1 className="text-2xl font-bold mb-2">College not found</h1>
              <p className="text-muted-foreground mb-4">The college you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/colleges')}>
                Back to Colleges
              </Button>
            </div>
          </AnimatedTransition>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <AnimatedTransition>
          <Button 
            variant="outline" 
            className="mb-6" 
            onClick={() => navigate('/colleges')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Colleges
          </Button>
          
          <Card className="glass-panel mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{college?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-base mt-2">
                    <MapPin className="h-4 w-4" />
                    {college?.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-base py-1.5">
                  {college?.ranking}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="overview" className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Courses</span>
                  </TabsTrigger>
                  <TabsTrigger value="placements" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Placements</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">Achievements</span>
                  </TabsTrigger>
                  <TabsTrigger value="alumni" className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Alumni</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        College Features
                      </h3>
                      <ul className="space-y-1">
                        {college.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Quick Overview
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Established</span>
                          <span className="font-medium">1954</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Campus Size</span>
                          <span className="font-medium">325 acres</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Student Population</span>
                          <span className="font-medium">10,500+</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Faculty</span>
                          <span className="font-medium">850+</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-muted-foreground">Acceptance Rate</span>
                          <span className="font-medium">8.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Available Courses
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college && getCoursesForCollege(college.name).map((course, index) => (
                      <Card key={index} className="border border-muted hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <Badge className="w-fit mb-2" variant="outline">
                            {course.level}
                          </Badge>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>
                            {course.duration} • {course.field}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p className="line-clamp-2">{course.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="placements" className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Placement Statistics
                  </h3>
                  
                  {(() => {
                    const placementData = getPlacementDetails(college.name);
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardHeader className="pb-2">
                            <CardDescription>Average Package</CardDescription>
                            <CardTitle className="text-2xl">{placementData.averageSalary}</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card className="bg-primary/5 border-primary/20">
                          <CardHeader className="pb-2">
                            <CardDescription>Highest Package</CardDescription>
                            <CardTitle className="text-2xl">{placementData.highestSalary}</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card className="bg-primary/5 border-primary/20">
                          <CardHeader className="pb-2">
                            <CardDescription>Placement Rate</CardDescription>
                            <CardTitle className="text-2xl">{placementData.placementRate}</CardTitle>
                          </CardHeader>
                        </Card>
                      </div>
                    );
                  })()}
                  
                  <div>
                    <h4 className="text-md font-semibold mb-3">Top Recruiters</h4>
                    <div className="flex flex-wrap gap-2">
                      {getPlacementDetails(college.name).topRecruiters.map((company, index) => (
                        <Badge key={index} variant="secondary">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    College Achievements
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getCollegeAchievements(college.name).map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                        <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p>{achievement}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="alumni" className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Notable Alumni
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college && getNotableAlumni(college.name).map((alumni, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <Card className="border border-muted hover:shadow-md transition-all cursor-pointer">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-2 border-primary/20">
                                  <AvatarImage src={alumni.photo} alt={alumni.name} />
                                  <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    {alumni.name}
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                  </CardTitle>
                                  <CardDescription>{alumni.position}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="text-sm">
                                <span className="text-muted-foreground">Batch of {alumni.batch}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-xl flex items-center gap-2 mb-2">
                              {alumni.name}
                            </DialogTitle>
                            <DialogDescription className="text-sm font-medium text-primary">
                              {alumni.position}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col sm:flex-row gap-4 items-start py-2">
                            <Avatar className="h-24 w-24 border-2 border-primary/20">
                              <AvatarImage src={alumni.photo} alt={alumni.name} />
                              <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-3">
                              <p className="text-sm leading-relaxed">{alumni.bio}</p>
                              <div className="text-sm">
                                <span className="text-muted-foreground font-medium">Batch of {alumni.batch}</span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CollegeDetailsPage;
