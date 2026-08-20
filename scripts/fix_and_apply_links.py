import sys
import time
import json
import ctypes
import requests
import websocket

sys.stdout.reconfigure(encoding='utf-8')

def copy_text_to_clipboard(text):
    user32 = ctypes.windll.user32
    kernel32 = ctypes.windll.kernel32
    
    kernel32.GlobalAlloc.argtypes = [ctypes.c_uint, ctypes.c_size_t]
    kernel32.GlobalAlloc.restype = ctypes.c_void_p
    kernel32.GlobalLock.argtypes = [ctypes.c_void_p]
    kernel32.GlobalLock.restype = ctypes.c_void_p
    kernel32.GlobalUnlock.argtypes = [ctypes.c_void_p]
    kernel32.GlobalUnlock.restype = ctypes.c_bool

    user32.OpenClipboard.argtypes = [ctypes.c_void_p]
    user32.OpenClipboard.restype = ctypes.c_bool
    user32.SetClipboardData.argtypes = [ctypes.c_uint, ctypes.c_void_p]
    user32.SetClipboardData.restype = ctypes.c_void_p
    user32.CloseClipboard.argtypes = []
    user32.CloseClipboard.restype = ctypes.c_bool
    
    CF_UNICODETEXT = 13
    text_bytes = text.encode('utf-16le') + b'\x00\x00'
    GHND = 0x0042
    h_mem = kernel32.GlobalAlloc(GHND, len(text_bytes))
    p_mem = kernel32.GlobalLock(h_mem)
    if not p_mem:
        raise Exception("Failed to lock global memory for clipboard")
        
    ctypes.memmove(p_mem, text_bytes, len(text_bytes))
    kernel32.GlobalUnlock(h_mem)
    
    if not user32.OpenClipboard(None):
        raise Exception("Failed to open clipboard")
    try:
        user32.EmptyClipboard()
        user32.SetClipboardData(CF_UNICODETEXT, h_mem)
    finally:
        user32.CloseClipboard()

res = requests.get('http://127.0.0.1:9222/json')
tabs = [t for t in res.json() if '1GmHAU0djifmwDDPyiufmCnI3h9xWu57qn5qRQaUS50M' in t.get('url', '')]
if not tabs:
    print("No matching tab found")
    sys.exit(1)

ws = websocket.create_connection(tabs[0]['webSocketDebuggerUrl'], suppress_origin=True)

msg_id = 1
def eval_js(expr):
    global msg_id
    msg = {'id': msg_id, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True}}
    msg_id += 1
    ws.send(json.dumps(msg))
    r = json.loads(ws.recv())
    return r.get('result', {}).get('result', {}).get('value')

def send_key(key_type, key, code, vk, modifiers=0):
    global msg_id
    params = {
        "type": key_type,
        "key": key,
        "code": code,
        "windowsVirtualKeyCode": vk,
        "nativeVirtualKeyCode": vk,
        "modifiers": modifiers
    }
    msg = {"id": msg_id, "method": "Input.dispatchKeyEvent", "params": params}
    msg_id += 1
    ws.send(json.dumps(msg))
    ws.recv()

def select_range_and_paste(range_str, text_to_paste):
    print(f"Selecting range {range_str}...")
    eval_js(f"""
    (() => {{
      let box = document.getElementById('t-name-box');
      if (box) {{
        box.focus();
        box.value = '{range_str}';
        box.dispatchEvent(new Event('input', {{ bubbles: true }}));
        box.dispatchEvent(new Event('change', {{ bubbles: true }}));
      }}
    }})()
    """)
    time.sleep(0.4)
    send_key("rawKeyDown", "Enter", "Enter", 13)
    send_key("keyUp", "Enter", "Enter", 13)
    time.sleep(0.5)

    eval_js("""
    (() => {
      let canvas = document.querySelector('.grid-canvas') || document.querySelector('.waffle-rich-text-editor');
      if (canvas) canvas.focus();
    })()
    """)
    time.sleep(0.4)

    if text_to_paste is None:
        # Just press delete
        print("Clearing range...")
        send_key("rawKeyDown", "Delete", "Delete", 46)
        send_key("keyUp", "Delete", "Delete", 46)
    else:
        print("Pasting to range...")
        copy_text_to_clipboard(text_to_paste)
        time.sleep(0.3)
        send_key("rawKeyDown", "Control", "ControlLeft", 17, modifiers=2)
        send_key("rawKeyDown", "v", "KeyV", 86, modifiers=2)
        send_key("keyUp", "v", "KeyV", 86, modifiers=2)
        send_key("keyUp", "Control", "ControlLeft", 17, modifiers=0)

    time.sleep(1.0)

# Step 1: Clear A1:A3
select_range_and_paste('A1:A3', None)

# Step 2: Set A3 header to 'TT'
select_range_and_paste('A3', 'TT')

# Step 3: Restore A4:A26 with numbers 1 to 23
stt_list = [str(i) for i in range(1, 24)]
select_range_and_paste('A4', "\n".join(stt_list))

# Step 4: Paste 23 links into F4
links = [
    "https://greenseatour.vn/?tour=fitcxr01",
    "https://greenseatour.vn/?tour=fitdad01",
    "https://greenseatour.vn/?tour=fitdad02",
    "https://greenseatour.vn/?tour=fithan01",
    "https://greenseatour.vn/?tour=fithan02",
    "https://greenseatour.vn/?tour=fithan03",
    "https://greenseatour.vn/?tour=fitpqc01",
    "https://greenseatour.vn/?tour=fitpqc02",
    "https://greenseatour.vn/?tour=fitsgn01",
    "https://greenseatour.vn/?tour=cxr01",
    "https://greenseatour.vn/?tour=cxr02",
    "https://greenseatour.vn/?tour=dad01",
    "https://greenseatour.vn/?tour=dad02",
    "https://greenseatour.vn/?tour=dad03",
    "https://greenseatour.vn/?tour=dad04",
    "https://greenseatour.vn/?tour=dad05",
    "https://greenseatour.vn/?tour=han01",
    "https://greenseatour.vn/?tour=han02",
    "https://greenseatour.vn/?tour=han03",
    "https://greenseatour.vn/?tour=pqc01",
    "https://greenseatour.vn/?tour=pqc02",
    "https://greenseatour.vn/?tour=sgn01",
    "https://greenseatour.vn/?tour=sgn02"
]
select_range_and_paste('F4', "\n".join(links))

print("Done all steps!")
ws.close()
