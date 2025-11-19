// --- 状态管理 ---
const state = {
    tps: 20.0,
    players: 12,
    logs: [],
    isLuoAwake: false
};

// --- 视图切换 ---
function switchView(viewId) {
    // 移除所有 active 类
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-menu li').forEach(el => el.classList.remove('active'));
    
    // 添加 active 到目标
    document.getElementById(viewId).classList.add('active');
    
    // 侧边栏高亮逻辑
    const menuItems = document.querySelectorAll('.nav-menu li');
    if(viewId === 'home') menuItems[0].classList.add('active');
    if(viewId === 'rain') {
        menuItems[1].classList.add('active');
        document.getElementById('rain-cmd').focus(); // 聚焦终端
    }
    if(viewId === 'luo') menuItems[2].classList.add('active');
    if(viewId === 'server') menuItems[3].classList.add('active');
}

// --- Rain Console 模拟引擎 ---
function generateLog(text, type = 'sys') {
    const logBox = document.getElementById('rain-logs');
    const div = document.createElement('div');
    div.className = `log-line log ${type}`;
    
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    div.innerHTML = `<span style="opacity:0.5">[${time}]</span> ${text}`;
    
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
}

function updateMonitor() {
    // 模拟 TPS 波动
    state.tps = (19.6 + Math.random() * 0.4).toFixed(1);
    // 模拟 内存 波动
    const mem = (4.0 + Math.random() * 0.5).toFixed(1);
    
    document.getElementById('tps-val').innerText = state.tps;
    document.getElementById('mem-val').innerText = mem + " GB";
    
    // 随机生成系统日志
    if(Math.random() > 0.8) {
        const tasks = ['GC.collect()', 'AutoSave', 'NeuralLink.ping()', 'Mod.sync()'];
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        generateLog(`[System] Executing background task: ${task}`, 'sys');
    }
}

// --- 神经连接 (QQ <-> MC) 模拟 ---
const qqUsers = ['群主-老张', '摸鱼的Alice', '新人小白', '龙王'];
const mcUsers = ['StevePro', 'Alex_007', 'CreeperLover', 'BuilderBob'];
const messages = [
    '谁有铁锭借我一组？',
    '服务器是不是又卡了？',
    '小雨，帮我查下领地指令',
    '哈哈哈哈',
    '有人去打龙吗？',
    '我想建个高达，求小落给点建议'
];

function simulateBridgeChat() {
    const chatBox = document.getElementById('bridge-chat');
    
    const isQQ = Math.random() > 0.5;
    const user = isQQ ? qqUsers[Math.floor(Math.random() * qqUsers.length)] : mcUsers[Math.floor(Math.random() * mcUsers.length)];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const source = isQQ ? 'QQ' : 'MC';
    
    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = `<span class="source ${source}">${source}</span> <span style="color:#aaa">${user}:</span> ${msg}`;
    
    chatBox.appendChild(div);
    if(chatBox.children.length > 8) chatBox.removeChild(chatBox.firstChild);
    
    // 如果消息包含 AI 名字，触发回应
    if(msg.includes('小雨')) {
        setTimeout(() => generateLog(`[Rain] Detected mention from ${user}: "${msg}"`, 'rain'), 500);
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'chat-msg';
            reply.innerHTML = `<span class="source MC" style="background:var(--rain-pri)">AI</span> <span style="color:var(--rain-pri)">小雨:</span> 收到，正在处理您的请求...`;
            chatBox.appendChild(reply);
        }, 1000);
    }
    
    if(msg.includes('小落')) {
        // 模拟数据传输给小落
        generateLog(`[Rain] Forwarding context to Aurora Luo...`, 'sys');
    }
}

// --- 小雨终端输入逻辑 ---
document.getElementById('rain-cmd').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const cmd = this.value;
        generateLog(`root@admin: ${cmd}`, 'sys');
        this.value = '';
        
        // 指令解析
        if(cmd.startsWith('/')) {
            setTimeout(() => generateLog(`[Server] Command executed: ${cmd}`, 'sys'), 300);
        } else if(cmd.includes('你好')) {
            setTimeout(() => generateLog(`[Rain] 管理员您好，所有系统运转正常。`, 'rain'), 500);
        } else {
            setTimeout(() => generateLog(`[Rain] 指令已记录。`, 'rain'), 500);
        }
    }
});

// --- 小落互动 ---
function triggerLuoChat() {
    const chatBox = document.getElementById('luo-chat-box');
    const responses = [
        "我在看大家的建筑截图呢，太棒了！✨",
        "听说昨天晚上服务器里发生了很精彩的PVP？",
        "需要我帮你找一些现代风建筑的蓝图吗？📚",
        "小雨姐姐刚才告诉我 TPS 很稳定，真是太好了~"
    ];
    const randomResp = responses[Math.floor(Math.random() * responses.length)];
    
    const div = document.createElement('div');
    div.className = 'msg luo';
    div.style.marginTop = '10px';
    div.innerHTML = `
        <div class="avatar">落</div>
        <div class="bubble">${randomResp}</div>
    `;
    chatBox.appendChild(div);
}

// --- Server Avatar 生成 ---
function generateAvatars() {
    const container = document.getElementById('online-avatars');
    for(let i=0; i<12; i++) {
        const div = document.createElement('div');
        div.className = 'avatar-sm';
        // 使用随机颜色模拟头像
        div.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        container.appendChild(div);
    }
}

// --- 初始化 ---
window.onload = () => {
    console.log("Aurora Nexus Initialized.");
    generateLog("[System] Aurora Rain Core loaded.", 'sys');
    generateLog("[System] Aurora Luo Module loaded.", 'sys');
    generateLog("[System] Neural Bridge established.", 'ok');
    
    setInterval(updateMonitor, 1500);
    setInterval(simulateBridgeChat, 3000);
    generateAvatars();
};

function copyIP() {
    const ip = document.getElementById('server-ip').innerText;
    navigator.clipboard.writeText(ip);
    alert('服务器地址已复制: ' + ip);
}
