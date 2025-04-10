import {
  BookmarkIcon,
  HomeIcon,
  MessageCircleIcon,
  MicIcon,
  PlayCircleIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  UsersIcon,
  StopCircleIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useVoiceRecorder } from "../../lib/useVoiceRecorder";

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: number;
};

type Post = {
  id: string;
  user: { name: string; avatar: string; role: string };
  audioUrl: string;
  likes: number;
  comments: Comment[];
  timestamp: number;
};


// Data for stories
const storiesData = [
  { id: 1, image: "/image-5.png", isUser: true },
  { id: 2, image: "/image-6.png" },
  { id: 3, image: "/image-7.png" },
  { id: 4, image: "/image-8.png" },
  { id: 5, image: "/image-9.png" },
  { id: 6, image: "/image-10.png" },
  { id: 7, image: "/image-11.png" },
];

// Data for navigation items
const navigationItems = [
  {
    icon: <div className="w-[21px] h-5 bg-[url(/play.png)] bg-[100%_100%]" />,
    label: "Learning",
  },
  {
    icon: <div className="w-[18px] h-5 bg-[url(/chart.png)] bg-[100%_100%]" />,
    label: "Insights",
  },
  {
    icon: (
      <div className="w-[18px] h-5 bg-[url(/add-user.png)] bg-[100%_100%]" />
    ),
    label: "Find colleagues",
  },
  {
    icon: (
      <div className="w-[15px] h-5 bg-[url(/bookmark.png)] bg-[100%_100%]" />
    ),
    label: "Bookmarks",
  },
  {
    icon: <div className="w-[18px] h-5 bg-[url(/game.png)] bg-[100%_100%]" />,
    label: "Gaming",
    badge: "New",
  },
  {
    icon: (
      <div className="w-[17px] h-5 bg-[url(/setting.png)] bg-[100%_100%]" />
    ),
    label: "Settings",
  },
];

// Data for hashtags
const hashtagsData = [
  { id: 1, tag: "work" },
  { id: 2, tag: "business" },
  { id: 3, tag: "hr" },
  { id: 4, tag: "userinterface" },
  { id: 5, tag: "digital" },
  { id: 6, tag: "userexperience" },
  { id: 7, tag: "ux" },
  { id: 8, tag: "ui" },
  { id: 9, tag: "freelance" },
];

// Data for people recommendations
const peopleData = [
  { id: 1, name: "Jacob", image: "/profile-2.png" },
  { id: 2, name: "Darlene", image: "/profile-3.png" },
  { id: 3, name: "Irma", image: "/profile-1.png" },
];

// Mock posts data
const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Jane',
      avatar: '/image-2.png',
      role: 'UI/UX Designer'
    },
    audioUrl: '',
    likes: 99,
    comments: 8,
    timestamp: Date.now() - 1000 * 60 * 15 // 15 minutes ago
  }
];

export const Frame = (): JSX.Element => {
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder("calvin");
  const [posts, setPosts] = useState(mockPosts);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/feed");
      const data = await res.json();
      const sorted = data.sort((a, b) => b.timestamp - a.timestamp);
      setPosts([...sorted]);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  console.log(posts);


  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
      setTimeout(fetchPosts, 1000); // wait a sec for upload
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative w-full max-w-[1440px] h-[1024px] bg-[#f6f6f6] rounded-[34px] overflow-hidden mx-auto">
      {/* Header */}
      <header className="w-full h-[76px] bg-white flex items-center justify-between px-[157px]">
        {/* Logo */}
        <div className="h-10">
          <Button className="w-[114px] h-10 bg-linkedin-color rounded-lg">
            <span className="font-bold text-on-primary-high-emphasis text-4xl">
              Voxa
            </span>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-[93px]">
          <div className="flex items-center relative">
            <HomeIcon className="w-[22px] h-[23px]" />
            <div className="absolute w-[43px] h-0.5 bottom-[-18px] bg-linkedin-color" />
          </div>
          <UsersIcon className="w-[25px] h-5" />
          <div className="w-[23px] h-[23px] bg-[url(/work.png)] bg-[100%_100%]" />
          <div className="relative">
            <div className="w-[22px] h-[25px] bg-[url(/notification.png)] bg-[100%_100%]" />
            <Badge className="absolute -top-1 -right-2 bg-[#ff0000] text-[11px] h-[18px] w-[18px] p-0 flex items-center justify-center">
              9+
            </Badge>
          </div>
          <div className="relative">
            <MessageCircleIcon className="w-[25px] h-[25px]" />
            <Badge className="absolute -top-1 -right-2 bg-[#ff0000] text-[11px] h-4 w-4 p-0 flex items-center justify-center">
              6
            </Badge>
          </div>
          <div className="w-[18px] h-[23px] bg-[url(/profile.png)] bg-[100%_100%]" />
        </div>

        {/* Search */}
        <div className="relative">
          <Separator
            orientation="vertical"
            className="absolute -left-[11px] h-[45px]"
          />
          <div className="w-[267px] h-11 bg-[#f6f6f6] rounded-[18px] flex items-center">
            <span className="ml-3.5 text-[#00000087] text-xs">
              Search for anything
            </span>
            <div className="ml-auto w-[61px] h-11 bg-[#00abff75] rounded-r-[18px] flex items-center justify-center">
              <SearchIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* User Profile Card */}
      <Card className="absolute w-[278px] h-[68px] top-[114px] left-[137px] rounded-none shadow-none">
        <CardContent className="p-0 flex items-center">
          <Avatar className="w-10 h-10 ml-[11px] mt-[11px]">
            <AvatarImage src="/image-5.png" alt="Calvin" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div className="ml-[12px] mt-[11px]">
            <p className="text-xs text-black">Calvin</p>
            <p className="text-[10px] text-[#00000075]">UI/UX Designer</p>
          </div>
        </CardContent>
        <Separator className="mt-[15px]" />
      </Card>

      {/* Navigation Menu */}
      <Card className="absolute w-[278px] h-[312px] top-[202px] left-[140px] bg-[#fcfdfd] rounded-2xl">
        <CardContent className="p-6">
          <nav className="space-y-12">
            {navigationItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-[22px] h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="ml-[15px] text-on-surface-medium-emphasis text-base">
                  {item.label}
                </span>
                {item.badge && (
                  <div className="ml-auto">
                    <Badge className="bg-[#00acff] text-[11px] h-5 w-9 rounded-lg border-2 border-white">
                      {item.badge}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Hashtags Card */}
      <Card className="absolute w-[280px] h-[188px] top-[540px] left-[140px] bg-[#fcfdfd] rounded-[18px]">
        <CardContent className="p-0">
          <p className="mt-[18px] ml-[29px] text-xs text-[#181818]">
            FOLLOWED HASHTAGS
          </p>
          <Separator className="mt-[7px] mx-[29px] w-[220px]" />
          <div className="flex flex-wrap gap-2 mt-[15px] ml-[29px] mr-[29px]">
            {hashtagsData.map((hashtag) => (
              <Badge
                key={hashtag.id}
                variant="secondary"
                className="bg-[#e8f0f7] text-[#181818] text-xs rounded font-normal px-3 py-1"
              >
                #{hashtag.tag}
              </Badge>
            ))}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-[108px] right-[32px]"
          >
            <PlusIcon className="w-[18px] h-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Stories Section */}
      <div className="absolute w-[575px] h-[100px] top-[114px] left-[434px]">
        <p className="absolute top-0 left-2 text-lg text-[#606770] font-medium tracking-[0.50px]">
          Stories
        </p>
        <div className="absolute top-7 left-0 flex space-x-[15px]">
          {storiesData.map((story, index) => (
            <div key={story.id} className="relative">
              <Avatar
                className={`w-[72px] h-[72px] ${index === 0 ? "w-[60px] h-[60px] mt-[3px]" : ""}`}
              >
                <AvatarImage src={story.image} alt="Story" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              {story.isUser && (
                <div className="absolute w-[26px] h-[26px] top-[41px] left-[39px] bg-white rounded-[13px] flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#00acff] rounded-[10px] flex items-center justify-center">
                    <div className="w-0.5 h-3.5 bg-white rounded-[30px]" />
                    <div className="w-3.5 h-0.5 bg-white rounded-[30px] absolute" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Post Input with Recording Button */}
      <div className="absolute w-[570px] h-[69px] top-[212px] left-[434px]">
        <Card className="h-[69px] bg-general-surface rounded-2xl shadow-shadow-02dp">
          <CardContent className="p-0 flex items-center">
            <Avatar className="w-10 h-10 ml-[5px] mt-2.5">
              <AvatarImage src="/image-5.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="ml-[7px] flex items-center">
              <span className="text-on-surface-medium-emphasis text-base">
                Say something...
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRecordClick}
                className={isRecording ? 'text-red-500' : ''}
              >
                {isRecording ? (
                  <StopCircleIcon className="w-[19px] h-[23px]" />
                ) : (
                  <MicIcon className="w-[19px] h-[23px]" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Feed */}
      <div className="absolute top-[300px] left-[434px] w-[570px] space-y-6 overflow-y-auto max-h-[calc(100%-300px-80px)] pb-20">
        {posts.map((post) => (
          <Card key={post.id} className="w-full bg-white rounded-[18px] shadow-none">
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="flex items-start p-[25px] pb-0">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-[14px]">
                  <p className="text-xs text-black">{post.user.name}</p>
                  <p className="text-[10px] text-[#00000075]">{post.user.role}</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-1 h-1 bg-[#c4c4c4] rounded-sm" />
                    <div className="w-1 h-1 bg-[#c4c4c4] rounded-sm" />
                    <div className="w-1 h-1 bg-[#c4c4c4] rounded-sm" />
                  </div>
                </Button>
              </div>

              {/* Voice Message */}
              <div className="flex items-center justify-between p-4 mx-[15px] mt-[27px] bg-neutral-800 rounded-xl">
                <div className="text-[#b0b0b0] text-xs">Voice Message</div>
                <audio src={post.audioUrl} controls className="h-8 w-32" />
              </div>

              {/* Post Actions */}
              <div className="flex items-center mt-[20px] ml-[17px] pb-4">
                <div className="flex items-center">
                  <img
                    className="w-[22px] h-[21px]"
                    alt="Like"
                    src="/uiw-like-o.svg"
                  />
                  <Badge className="ml-[-4px] bg-linkedin-color text-[11px] h-5 w-[51px] rounded-lg border-2 border-white flex items-center">
                    <span className="text-on-primary-high-emphasis">
                      +{post.likes}
                    </span>
                  </Badge>
                </div>
                <Badge className="ml-[25px] bg-linkedin-color text-[11px] h-5 w-5 rounded-lg border-2 border-white flex items-center justify-center">
                  {post.comments}
                </Badge>
                <SendIcon className="w-5 h-5 ml-[5px]" />
                <BookmarkIcon className="w-4 h-5 ml-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* People You May Know */}
      <Card className="absolute w-[278px] h-[306px] top-[114px] left-[1022px] bg-[#fcfdfd] rounded-2xl">
        <CardContent className="p-0">
          <h3 className="mt-6 ml-[22px] text-base font-medium text-on-surface-high-emphasis">
            People you may know:
          </h3>

          <div className="mt-[25px]">
            {peopleData.map((person, index) => (
              <div key={person.id} className="flex items-center mb-[15px]">
                <Avatar className="w-[50px] h-[50px] ml-[15px]">
                  <AvatarImage src={person.image} alt={person.name} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-[8px] text-base font-medium text-on-surface-high-emphasis">
                  {person.name}
                </span>
                <Button
                  variant="outline"
                  className="ml-auto mr-[22px] h-8 w-[65px] text-xs font-medium text-[#00acff] border-[#00acff]"
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>

          <Separator className="mt-[15px]" />

          <div className="flex justify-center mt-[17px]">
            <Button
              variant="link"
              className="text-xs font-medium text-[#00acff]"
            >
              See All
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Messages Button */}
      <Card className="absolute w-[278px] h-14 bottom-[56px] left-[1017px] bg-general-surface shadow-shadow-02dp">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="flex items-center ml-[22px] mt-4">
            <MessageCircleIcon className="w-[18px] h-5" />
            <span className="ml-[15px] text-on-surface-medium-emphasis text-base">
              Messages
            </span>
            <Badge className="ml-[65px] bg-[#ff1930] text-[11px] h-5 w-5 rounded-lg border-2 border-white flex items-center justify-center">
              6
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="mr-[22px] mt-4">
            <div className="w-[15px] h-[9px] bg-[url(/arrow---up-2.png)] bg-[100%_100%]" />
          </Button>
        </CardContent>
      </Card>
    </div>

  );
};