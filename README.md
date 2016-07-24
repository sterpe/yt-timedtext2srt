# yt-timedtext2srt

## Usage
```
npm i -g yt-timedtext2srt

# Only accepts from stdin
cat timedtext | yt-timedtext2srt > subtitles.srt
```

Converts this: 

```
curl -LSo timedtext https://www.youtube.com/api/timedtext?caps=asr&asr_langs=ko%2Cit%2Cde%2Cpt%2Cnl%2Cfr%2Cen%2Cru%2Ces%2Cja&sparams=asr_langs%2Ccaps%2Cv%2Cexpire&hl=en_US&signature=C2F78717735B9FBB3F3717DE97397080F85AED68.69181B743726C52FDACF9DB8043553B684A45426&key=yttt1&v=-sGiE10zNQM&expire=1469366672&lang=en&fmt=srv3
```

```xml
<timedtext format="3">
<body>
<p t="3934" d="1466">Narrator: Legends.</p>
<p t="5400" d="2300">Stories scattered through time.</p>
<p t="8300" d="3360">
Mankind has grown quite fond of recounting the exploits
</p>
<p t="11660" d="3300">of heroes and villains, forgetting so easily</p>
<p t="14960" d="4320">
that we are remnants, byproducts, of a forgotten past.
</p>
<p t="19767" d="4540">
Man, born from dust, was strong, wise, and resourceful.
</p>
<p t="24700" d="2960">But he was born into an unforgiving world.</p>
<p t="28300" d="3320">An inevitable darkness, creatures of destruction.</p>
<p t="31940" d="3593">The creatures of Grimm set their sights on man</p>
<p t="35533" d="1900">and all of his creations.</p>
</body>
</timedtext>
```

to `.srt`:

```
0
00:00:03,934 --> 00:00:05,400
Narrator: Legends.

1
00:00:05,400 --> 00:00:07,700
Stories scattered through time.

2
00:00:08,300 --> 00:00:11,660
Mankind has grown quite fond
of recounting the exploits

3
00:00:11,660 --> 00:00:14,960
of heroes and villains,
forgetting so easily

4
00:00:14,960 --> 00:00:19,280
that we are remnants, byproducts, of a forgotten past.

5
00:00:19,767 --> 00:00:24,307
Man, born from dust, was strong,
wise, and resourceful.

6
00:00:24,700 --> 00:00:27,660
But he was born into an unforgiving world.

7
00:00:28,300 --> 00:00:31,620
An inevitable darkness, creatures of destruction.

8
00:00:31,940 --> 00:00:35,533
The creatures of Grimm set
their sights on man

9
00:00:35,533 --> 00:00:37,433
and all of his creations.

```

So then you can transcode Youtube ADP streams to mp4 with a subtitle track like so and things mostly just work:

```
ffmpeg -i video.mp4 -i audio.mp4 -i subtitles.srt -c:v libx264 -crf 23 -scodec mov_text -metadata:s:s:0 language=eng -c:a aac -q:a 100 -ac 6 -strict -2 -y output.mp4
```
