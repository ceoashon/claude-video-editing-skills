# aroll.mkv + g/frames/*.png + mix.wav -> ../final/<title>.mp4 (one composite pass, 1080p)
import subprocess
OUT = "../final/final.mp4"
fc = ("[1:v]scale=out_color_matrix=bt709:out_range=tv,format=yuva444p10le[ov];"
      "[0:v]format=yuv444p10le[bg];[bg][ov]overlay=format=yuv444p10:eof_action=pass,"
      "scale=out_color_matrix=bt709:out_range=tv:sws_dither=ed,format=yuv420p[v]")
subprocess.run(['ffmpeg', '-v', 'error', '-stats', '-y', '-i', 'aroll.mkv', '-framerate', '30000/1001', '-i', 'g/frames/f%05d.png', '-i', 'mix.wav',
                '-filter_complex', fc, '-map', '[v]', '-map', '2:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14',
                '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
                '-c:a', 'aac', '-b:a', '320k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
