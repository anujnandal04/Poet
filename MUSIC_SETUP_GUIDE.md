# 🎵 Music Setup Guide for GitHub Pages

## Step 1: Upload Music to Google Drive

1. **Create a folder** in Google Drive: "Poetry Website Music"
2. **Upload all 26 music files** from your `/music` folder
3. **For each file**:
   - Right-click → Share → Change to "Anyone with the link"
   - Copy the share link

## Step 2: Convert Google Drive Links

**Original link format:**
```
https://drive.google.com/file/d/1ABC123DEF456GHI789/view?usp=sharing
```

**Convert to direct download:**
```
https://drive.google.com/uc?export=download&id=1ABC123DEF456GHI789
```

**Extract the FILE_ID** (the long string between `/d/` and `/view`)

## Step 3: Update script.js

Replace each `YOUR_FILE_ID_X` in `script.js` with the actual file ID:

**Your 26 music files to upload:**
1. Alex Warren  Ordinary Official Video.mp4
2. Carry you Home.mp4
3. Charlie Puth  Left And Right.mp4
4. Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp4
5. Cigarettes After Sex - Crush (Before Sunset).mp4
6. despacito.mp4
7. Ed Sheeran - Perfect.mp4
8. tomp3.cc - Ed Sheeran  Thinking Out Loud.mp4
9. fall in love again.mp4
10. follow you!.mp4
11. forever.mp4
12. hawaii.mp4
13. little bit more.mp4
14. Little Do You Know Beat Cry.mp4
15. love story.mp4
16. Those Eyes (Sped Up).mp4
17. Justin Timberlake - Mirrors.mp4
18. Kid In A Suit.mp4
19. Lana Del Rey - Video Games.mp4
20. One Of The Girls.mp4
21. Shawn Mendes, Camila Cabello - Señorita.mp4
22. Smooth.mp4
23. Talkin to you.mp4
24. The Chainsmokers & Coldplay - Something Just Like This (Official Lyric Video).mp4
25. Hymn to the Sea (Rose's Theme).mp4
26. y2mate.gg - Lord Huron  The Night We Met Official Audio_720pHF.mp4

## Step 4: GitHub Pages Setup

1. **Create GitHub repository**: `your-username.github.io` or `poetry-website`
2. **Upload all files EXCEPT the `/music` folder**
3. **Enable GitHub Pages** in repository settings
4. **Your site will be live** at: `https://your-username.github.io/poetry-website`

## Alternative: Use Cloudinary (Recommended)

**Cloudinary** is better for media files:
1. Sign up at cloudinary.com (free)
2. Upload your music files
3. Get direct URLs automatically
4. Better performance than Google Drive

## Testing Your Setup

After updating the file IDs, your music player will:
✅ Load external music files
✅ Work on GitHub Pages
✅ Stream music from Google Drive/Cloudinary
✅ Maintain all player functionality

**Need help?** The music player will show helpful error messages if links aren't working!
