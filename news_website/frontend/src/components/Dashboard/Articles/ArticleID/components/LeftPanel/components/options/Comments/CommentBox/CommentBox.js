import React from "react";
import "./css/CommentBox";

const CommentBox = ({article}) => {
    const exampleMessage = {
        article : {
            id: 14,
            key: "YDEKJVUFHR5YOBUIUWJB",
            date: "2022-08-25T20:42:13.955565Z",
            headline: "12 Stupid Things My Colleagues Have Said",
            sub_title: "It’s not everyday I hear someone say something stupid,.",
            reporter_account: {
                user: 11,
                key: "1RO2C9DCDT-C7L56TEMMY-MEEZLEQRVY",
                first_name: "Joey",
                last_name: "Green",
                creation_date: "2022-08-15T22:56:47.126030Z",
                role: "GUEST",
                phone: "444-124-4124",
                bio: "Joey Brown is a 29-year-old kitchen assistant who enjoys glamping, recycling and travelling. He is exciting and friendly, but can also be very standoffish and a bit greedy. He is an Italian Jedi who defines himself as bisexual. He finished school and then left academia. He has a severe phobia of sheep Physically, Joey is in good shape. He is very tall with chocolate skin, grey hair and green eyes. He grew up in a middle class neighbourhood. He was raised by his father, his mother having left when he was young. He is currently single. His most recent romance was with an artist called Zack Aria Day, who was 14 years older than him. They broke up because Joey wanted to be with somebody a bit more glamourous.",
                email: "JoeyBrown@gmail.com",
                occupation: "JoeyBrown@gmail.com",
                profile_pic: "/images/k.png",
                followers: 3,
                is_following: true,
            },
            rating: 78,
            isPrivate: false,
            visibility: "PUBLIC",
            article_description: "It’s not everyday I hear someone say something stupid, but sometimes the things I hear from my friends and colleagues in the journalism field really take the cake. I guess I shouldn’t criticize; I’ve told my colleagues that the moon is just God’s sniper glint, but that pales in comparison to the many things they have said in return.",
            article_body: "Let me spin up a yarn of my day. I ain’t much of a seafood kind of guy, but I don’t do much discriminating when I walk into a seafood restaurant. You know I’ll scoop me up some shrimp and butter up the biscuits of my day real good. I long for fish too. You know me. But bluefin? Huh? I can’t be cuttin’ up no dang tuna!\r\n\r\nSo, like, I recently listened to ‘Solar Power.’ You know, that new album by Lorde? Oh my — I, let me just tell you right now, that album? Massive hit! It’s like, so, so good. Auditory delight! She really killed it, like, for real. Way to stay winning, sis! You go, girl! Really, just, really such a big evolution from her 2014 self. I’m telling you, like, 2014 Lorde would utterly despise 2021 Lorde. Like, I would, so, like totally hate 2021 me too in 2014! Ew, yuck!\r\n\r\nRight, umm… tennis. Fun, innit? I never really saw the appeal of it until recently. More of a football guy, and no, not the kind the Americans play. Seriously, what’s with you guys and calling it ‘soccer?’ It’s football; you lot ought to call it by its proper name. You quite literally use your foot to kick the ball. Why is it called ‘soccer?’ Do you guys use socks or something? Oh, right, tennis. Fun, innit? I know I said that. There is something marvelous about the strategy in tennis. Where to hit the ball, where to stand on the court, and how to hit the ball with the racquet are all things I never felt I would ever be fascinated by. I just love how boring it is, like I feel like quite the posh elite celebrity. I’m quite well on my way to properly enjoying more mundane things this way, don’t you agree? It’s quite a smashing sport!\r\n\r\nI still don’t understand this climate change deal. Like, are you really telling me that I can’t just turn on an AC and solve this issue in some type of fashion? If the concern really is that the Earth is warming up, then just, I don’t know, put some ice on yourself and turn the fan on. Alternatively, I guess you can just stop living in a hot place. If I’m getting cooked alive in Arizona, I’m not about to complain that it’s hot. I’d just pack my bags and scram out of there. First off, why would I ever be in Arizona when I could at least be boiled alive while on my way to crippling debt next door in Las Vegas?\r\n\r\nThere will be no further explanation. There’ll only be vocal strain. These ‘pop’ singers will only go on one trajectory, and that trajectory is simply just down the drain. They can’t rhyme, so they’ll inevitably flop, one day, at some point in time. Weird, ain’t it? Lacking charisma. Being rightfully called a ‘flop’ singer after being a ‘pop’ singer. Truly the end of an era that never should’ve came, but every singer’s time is an error. You folks are, and do sound the same. Haven’t we suffered enough by living in the same universe as your discography? Henceforth every single singer in 2021 is irrevocably canceled! Have a day, you talentless muppets! Hahaha!\r\n\r\nThank God I’m an atheist. I don’t have to worry about gauging my favor with any higher order or shifting the core tenets of my life to the core tenets of a book whose veracity can’t be proven. Isn’t it weird that no one believes the news but everyone believes the Bible? Maybe Jesus should tell the news from now on and end every report with ‘swear to God.’\r\n\r\nCan you people stop being happy like, seriously? You guys were all depressed all year, right, and now you guys are, like, faking being all totally optimistic and whatnot. Stop smiling, like, ugh! For real, guys? You people are such total posers and it’s not even like funny at all. I want to cruise through my Instagram in peace but your very fake happiness is intruding, like, way up on my personal space of peace, like hello — I’m right here in front of you! Can you just not — ugh, whatever. I’ll just ignore you people — hey, don’t follow me around! Unless it’s on my Instagram or TikTok of course, but anything else is like, seriously illegal and definitely beyond predatory stalking! I know my rights, you know!\r\n\r\nMan, life in the city kind of hits different than life out on the prairie. I ain’t much of a concrete jungle kind of fella, you know, but now that I stepped out into New York City, I realized that maybe the farmland really is quite boring. I get into close call arguments with no-good hooligans doing gosh dang tomfoolery every day, and I can spin up some new yarn about my troubles with the bad folk of the city and how I wrangled them up like I was spending a hard day’s work in my grandpa’s old rodeo. I can’t be no associate of the criminally wicked, my good people, no sirree, for I am a good man and a good follower of the Lord and Savior. Now, my fellow good friends, please join me in bestowing an ‘Amen’ for we are indeed blessed on this fine day.\r\n\r\nI’m just saying, man. We can definitely solve the economic disparity in the country if the rich people just stopped being rich. Like, we can stop being poor any second now, but nobody really wants to let it happen. Seriously, I can just go get more money and be less poor than I was an hour prior. It’s that easy. The rich can just not have as much money. I think it’s a simple solution, and it’s incredibly easy, but no one is doing it because they’re complacent and well-adjusted to their current position of mediocrity. You hear me? You can just stop being poor, like come on, it’s not rocket science!\r\n\r\nAt this rate my friends, with the way things are going, if this is really it, I have some personal squabbles of my own to quash. Some scores to settle, if you may. I know the ramifications of what’ll happen when I roll up against my adversaries, and frankly, they don’t phase me one bit. I’m not out to look like the real life Batman or the Punisher. No, it’s more about striking fear into my foes and those around me by reminding them of the concept of consequences. All of this is going to come crashing down and it won’t be pleasant. I will see you for sure on the court when I lay down these threes in this next pickup game.\r\n\r\nI’ve been working on my politics here. On top of that, I have a great idea. I’m going to create the best website, and I can’t wait for y’all to migrate over there and make a lot of money. I promise you, everyone’s about to make money. Hate waiting but there’s a lot of big things coming out of me, one of them being straight greatness. But yeah, for real, I have great balance. Really, I just know I robbed elbows and got a great team of people to work with out here. I just have to be patient to get things finalized. I have no white privilege so I have to wait, then there are people talking about signing with them, so I’m just going to relax.\r\n\r\nThere’s a lot of polar opposite energy going on that just isn’t right. I’ve been we need to be tight-knit about things, but for real, people are fueling hostilities from other camps heavily. We need to lay it down on them. Boss me up, coach. I’ll wreck them up! I have allies on my back, hidden and sneaky, and they’ll all be ready to lay them all flat. They’re not winning this next basketball game no matter what! I guarantee that, for real, otherwise I wouldn’t be in business.\r\n\r\nY’all need to chill. For real.",
            tags: "Work",
            article_pic: "/images/buildings.jpeg",
            isBookmarked: false
        },
        messageList: {
            //message 0 -> n
            message:{
                id: 1,
                key: "123131215sff3251",
                creation_date: "2022-08-15T22:56:47.126030Z",
                parent: "Object: <message_id> ",
                content: "This article title really caught my attention! The author's storytelling skills are on point. I couldn't help but chuckle at their hilarious anecdotes about their colleagues. And the way they seamlessly transitioned from one topic to another is impressive. Definitely a great read!",
                article_id: 14,
                rating: {
                    overall: 4, // 6-2 can go negative
                    upVotes: 6,
                    downVotes: 2,
                },
            }
        },
    }
    return(
        <div>

        </div>
    )
}
export default CommentBox;