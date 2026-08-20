import sys
import time
import json
import ctypes
import requests
import websocket

sys.stdout.reconfigure(encoding='utf-8')

# Windows clipboard helper
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

# List of 23 web links in exact order of the sheet rows (TT 1 to 23)
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

clipboard_payload = "\n".join(links)

res = requests.get('http://127.0.0.1:9222/json')
tabs = [t for t in res.json() if '1GmHAU0djifmwDDPyiufmCnI3h9xWu57qn5qRQaUS50M' in t.get('url', '')]
if not tabs:
    print("Could not find open Google Sheet tab in Chrome on port 9222!")
    sys.exit(1)

ws_url = tabs[0]['webSocketDebuggerUrl']
print(f"Connecting to CDP tab: {tabs[0]['title']}")
ws = websocket.create_connection(ws_url, suppress_origin=True)

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

# 1. Switch to Link Lantour tab if not already on it
switch_js = """
(() => {
  function simulateClick(element) {
    let eventTypes = ['mousedown', 'mouseup', 'click'];
    eventTypes.forEach(type => {
      element.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    });
  }
  let tabs = Array.from(document.querySelectorAll('.docs-sheet-tab-name, .grid-tab-label-text'));
  let tab = tabs.find(el => el.innerText.trim().includes('Link Lantour') || el.innerText.trim().includes('Lantour'));
  if (tab) {
    simulateClick(tab);
    let parent = tab.closest('.docs-sheet-tab') || tab.closest('.grid-tab-button');
    if (parent) simulateClick(parent);
    return "Switched to tab: " + tab.innerText.trim();
  }
  return "Link Lantour tab not found";
})()
"""
res = eval_js(switch_js)
print(res)
time.sleep(1.0)

# 2. Copy links to clipboard
print("Copying 23 links to Windows clipboard...")
copy_text_to_clipboard(clipboard_payload)

# 3. Select cell F2 (or F2:F24)
print("Selecting cell F2 via NameBox...")
eval_js("""
(() => {
  let box = document.getElementById('t-name-box');
  if (box) {
    box.focus();
    box.value = 'F2';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    box.dispatchEvent(new Event('change', { bubbles: true }));
  }
})()
""")
time.sleep(0.5)
send_key("rawKeyDown", "Enter", "Enter", 13)
send_key("keyUp", "Enter", "Enter", 13)
time.sleep(0.8)

# 4. Focus Grid Canvas
eval_js("""
(() => {
  let canvas = document.querySelector('.grid-canvas') || document.querySelector('.waffle-rich-text-editor');
  if (canvas) canvas.focus();
})()
""")
time.sleep(0.5)

# 5. Paste (Ctrl+V)
print("Pasting links into Google Sheet...")
send_key("rawKeyDown", "Control", "ControlLeft", 17, modifiers=2)
send_key("rawKeyDown", "v", "KeyV", 86, modifiers=2)
send_key("keyUp", "v", "KeyV", 86, modifiers=2)
send_key("keyUp", "Control", "ControlLeft", 17, modifiers=0)

time.sleep(2.0)
print("Paste completed!")
ws.close()
