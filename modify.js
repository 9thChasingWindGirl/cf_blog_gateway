
addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const clientIP = request.headers.get('cf-connecting-ip') || '无法获取';

	const htmlContent = `
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>****'blog 测速页</title>
<style>
	:root {
		--main-font: Arial, sans-serif;
		--main-bg: rgba(255, 255, 255, 0.4);
		--blur-bg: blur(10px);
		--primary-color: #1a1f36;
		--accent-color: #6bdf8f;
		--hover-glow-color: rgba(51, 204, 153, 0.7);
		--low-opacity-shadow: rgba(0, 0, 0, 0.1);
		--high-opacity-shadow: rgba(0, 0, 0, 0.2);
		--border-radius: 24px;
		--hover-transition: all 0.3s ease;
	}

	body {
		font-family: var(--main-font);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
		background: url('// 替换为背景图片链接') center/cover no-repeat;
		color: #333;
	}

	.container {
		background: var(--main-bg);
		backdrop-filter: var(--blur-bg);
		border-radius: var(--border-radius);
		padding: 20px 16px;
		width: 480px;
		min-height: 620px;
		box-shadow: 0 8px 32px var(--low-opacity-shadow);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		transition: var(--hover-transition);
		overflow-wrap: break-word;
	}

	.container:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 36px var(--high-opacity-shadow);
		animation: glowGreen 4s infinite;
	}

	@keyframes glowGreen {
		0%, 100% {
			box-shadow: 0 0 10px 4px var(--hover-glow-color);
		}
		50% {
			box-shadow: 0 0 30px 12px var(--hover-glow-color);
		}
	}

	.logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 8px solid white;
		box-shadow: 0 4px 16px var(--low-opacity-shadow);
		object-fit: cover;
		transition: border-color 0.6s ease;
		animation: pulse 3.5s infinite;
	}

	.logo:hover {
		animation: glowGreen 4s infinite;
		border-color: #33CC99;
	}

	@keyframes pulse {
		0%, 100% {
			box-shadow: 0 4px 16px var(--low-opacity-shadow);
		}
		50% {
			box-shadow: 0 0 20px 6px var(--high-opacity-shadow);
		}
	}

	@keyframes glowGreen {
		0%, 100% {
			box-shadow: 0 0 10px 4px var(--hover-glow-color);
		}
		50% {
			box-shadow: 0 0 30px 12px var(--hover-glow-color);
		}
	}

	h1, h2 {
		color: var(--primary-color);
		text-align: center;
		position: relative;
		margin: 0 0 10px 0;
	}

	h1 {
		font-size: 28px;
		font-weight: 700;
		padding-bottom: 9px;
	}

	h2 {
		font-size: 20px;
		font-weight: 500;
		padding: 0 7px 5px 0;
		margin-bottom: 7px;
	}

	h1::after, h2::after {
		content: '';
		position: absolute;
		bottom: 0;
		background: var(--accent-color);
		border-radius: 2px;
	}

	h1::after {
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 4px;
	}

	h2::after {
		left: 75%;
		transform: translateX(-50%);
		width: 60px;
		height: 3px;
	}

	.visitor-count, .ip-address {
		font-size: 14px;
		margin-top: 5px;
	}

	.ip-address {
		color: #555;
		font-style: italic;
	}

	#testBtn {
		padding: 8px 16px;
		background-color: #007bff;
		border: none;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		cursor: pointer;
		margin: 1em 0;
		transition: background-color 0.3s ease;
	}

	#testBtn:hover {
		background-color: #0056b3;
	}

	ul {
		list-style: none;
		width: 100%;
		padding: 0;
		margin: 0;
	}

	ul li {
		color: var(--primary-color);
		font-size: 16px;
		line-height: 1.6;
		padding: 3px 7px;
		margin-bottom: 6px;
		background: var(--main-bg);
		border-radius: 9px;
		transition: var(--hover-transition);
	}

	ul li:hover {
		background: rgba(255, 255, 255, 0.8);
		transform: translateX(5px);
		box-shadow: 4px 4px 12px var(--high-opacity-shadow);
		animation: glowGreen 7s infinite;
	}

	.test-item {
		margin-bottom: 1em;
	}

	.label {
		font-weight: bold;
		display: inline-block;
		word-break: break-word;
		max-width: 100%;
	}

	.label.lowest-latency {
		color: green;
		cursor: pointer;
		text-decoration: underline;
	}

	.label.failed {
		color: red;
		cursor: default;
	}

	.clickable-link {
		color: #000;
		text-decoration: underline;
		cursor: pointer;
	}

	.progress-container {
		position: relative;
		width: 100%;
		height: 25px;
		background: linear-gradient(to right, green, orange, red);
		border-radius: 4px;
		overflow: hidden;
		margin: 5px 0;
	}

	.progress-bar {
		position: absolute;
		height: 100%;
		background: rgba(255, 255, 255, 0.7);
		width: 0%;
		transition: width 0.5s ease-out;
	}

	.result-text {
		position: absolute;
		width: 100%;
		text-align: center;
		line-height: 25px;
		font-size: 14px;
		font-weight: bold;
		color: #000;
	}

	@media (max-width: 600px) {
		.container {
			width: 90vw;
			min-height: 35vh;
			padding: 16px 12px;
		}

	.logo-wrapper {
		width: 120px;
		height: 120px;
		margin-bottom: 12px;
	}

	.logo {
		border: 6px solid white;
		box-shadow: 0 0 17px 6px var(--hover-glow-color);
		animation: glowGreen 2s infinite;
		border-color: #33CC99;
	}

	.container:hover {
		animation: none !important;
		transform: none;
		box-shadow: 0 8px 32px var(--low-opacity-shadow);
		}
	}
</style>

	</head>
	<body>
		<div class="container">
		<div class="avatar-container" style="width: 120px; height: 120px; margin: 50px auto;">
		<a href="https://github.com/9thChasingWindGirl/blog_gateway/blob/main/modify.js" target="_blank" rel="noopener noreferrer" >
			<img class="logo" src="// 替换为头像图片链接" alt="头像">
			</a>
	  			</div>
	  		<h1>****的博客测速页</h1>
			<div class="visitor-count">
				🧲🤣!!! 📈今日访问人数:<span id="visitCount">加载中...</span>
			</div>
			<div class="ip-address">
				您的 IP 地址: <span id="clientIP">${clientIP}</span>
			</div>

			<h2>测速结果(最低延迟域名将以“👈”标识)：</h2>
			<div id="testContainer"></div>
			<button id="testBtn" onclick="startTest()">开始测速</button>
			<p>
			<a href="// 替换为备案信息链接" target="_blank" style="color: black; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center;">
 				 <img src="https://icp.gov.moe/favicon.ico" alt="ICP图标" style="width:16px; height:16px; margin-right: 6px;">
  					萌ICP备 ****** 号
			</a> <br>
			<a href="// 替换为uptimerobot监测链接" target="_blank" style="color: black; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center;">
 				 <img src="https://uptimerobot.com/favicon.ico" alt="ICP图标" style="width:16px; height:16px; margin-right: 6px;">
  					网站性能监测</a>
			</p>
		</div>
	

		<script>
			// 访问人数统计
			fetch('https://tongji.090227.xyz/?id=// 替换为不带http(s)://的域名地址')
				.then(r => r.json())
				.then(d => document.getElementById('visitCount').innerText = d.visitCount)
				.catch(e => document.getElementById('visitCount').innerText = '加载失败');

			const testSites = [
			// 测速节点配置示例
			{ name: '节点1', url: '// 替换为节点1域名' },
			{ name: '节点2', url: '// 替换为节点2域名' },
			{ name: '节点3', url: '// 替换为节点3域名' },
			{ name: '节点4', url: '// 替换为节点4域名' },
			{ name: '节点5', url: '// 替换为节点5域名' }
		];

			const maxTime = 3000;
			let results = [];
			let finishedCount = 0;

			function startTest() {
				document.getElementById('testBtn').textContent = '重新测速';
				results = [];
				finishedCount = 0;

				const container = document.getElementById('testContainer');
				container.innerHTML = '';
				
				const ul = document.createElement('ul');

				if (!navigator.onLine) {
					alert("网络连接已断开，无法测速");
					return;
				}
			
				
				testSites.forEach((site, index) => {
					const li = document.createElement('li');
					li.className = 'test-item';

					const label = document.createElement('span');
					label.className = 'label';
					label.textContent = site.name + '：';
					label.dataset.url = site.url;
					label.style.flex = '1'; 
				
					const progressWrap = document.createElement('div');
					progressWrap.className = 'progress-container';
					progressWrap.style.flex = '0 0 150px'; 
				
					const bar = document.createElement('div');
					bar.className = 'progress-bar';
				
					const result = document.createElement('div');
					result.className = 'result-text';
					result.textContent = '测速中...';
				
					progressWrap.appendChild(bar);
					progressWrap.appendChild(result);
				
					li.appendChild(label);
					li.appendChild(progressWrap);
				
					ul.appendChild(li);
				
					testLatency(site.url, result, bar, index, label);
				});
				
				container.appendChild(ul);
				
			}

			function testLatency(url, resultElem, barElem, index, labelElem) {
				const start = performance.now();
				let finished = false;
			
				fetch(url + '/favicon.ico?_nocache=' + Date.now() + Math.random(), { method: 'HEAD', mode: 'no-cors' })
					.then(() => {
						if (finished) return;
						finished = true;
						const duration = Math.round(performance.now() - start);
						results[index] = duration;
						updateUI(duration, resultElem, barElem);
						checkAllFinished();
					})
					.catch(() => {
						if (finished) return;
						finished = true;
						results[index] = null;
						updateUI('timeout', resultElem, barElem);
						checkAllFinished();
					});
			
				setTimeout(() => {
					if (!finished) {
						finished = true;
						results[index] = null;
						updateUI('timeout', resultElem, barElem);
						checkAllFinished();
					}
				}, maxTime);
			}

			function updateUI(result, resultElem, barElem) {
				if (typeof result === 'number') {
					resultElem.textContent = result + ' ms';
					let percent = Math.min(result / maxTime * 100, 100);
					barElem.style.width = percent + '%';
					resultElem.style.color = '';
				} else {
					resultElem.textContent = result === 'timeout' ? '超时⚠️' : '失败🚫';
					barElem.style.width = '100%';
					resultElem.style.color = 'red';
				}
			}

			function checkAllFinished() {
				finishedCount++;
				if (finishedCount === testSites.length) {
					markLowestLatency();
					enableLinks();
				}
			}

			function markLowestLatency() {
				let minTime = null;
				let minIndex = -1;
				results.forEach((r, i) => {
				  if (r !== null && (minTime === null || r < minTime)) {
					minTime = r;
					minIndex = i;
				  }
				});
				if (minIndex !== -1) {
				  const container = document.getElementById('testContainer');
				  const items = container.querySelectorAll('.test-item');
				  const label = items[minIndex].querySelector('.label');
				  label.textContent += ' 👈👈👈';
				  label.classList.add('lowest-latency');
				}
			  }
			  
			function createLinkHandler(url) {
			return () => window.open(url, '_blank');
		}

		function enableLinks() {
			const container = document.getElementById('testContainer');
			const labels = container.querySelectorAll('.label');
				labels.forEach((label, i) => {
				  const resultText = label.nextElementSibling.querySelector('.result-text').textContent;
				  const url = label.dataset.url;
			  
				if (label.classList.contains('lowest-latency')) {
					label.classList.add('clickable-link');
					label.classList.remove('failed');
					label.onclick = createLinkHandler(url);
		} else if (!resultText.includes('超时') && !resultText.includes('失败')) {
			label.classList.add('clickable-link');
			label.classList.remove('failed', 'lowest-latency');
			label.onclick = createLinkHandler(url);
				} else {
					label.classList.remove('clickable-link');
					label.classList.remove('lowest-latency');
					label.classList.add('failed');
					label.onclick = null;
				}
			});
		}
			  
		</script>
	</body>
	</html>
	`;

	return new Response(htmlContent, {
		headers: { 'content-type': 'text/html;charset=UTF-8' },
	});
}
