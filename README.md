# Cloudflare Workers的网关测速页

## 代码合并自：
- [cmliu/Blog-CDN-Gateway](https://github.com/cmliu/Blog-CDN-Gateway)
- [jc-lw/ping-zhineng](https://github.com/jc-lw/ping-zhineng)

## 修改 modify.js 代码的补全内容
### 1.替换所有 // 替换为... 占位内容
#### 例如：
```html
background: url('// 替换为背景图片链接')
<img class="logo" src="// 替换为头像图片链接"
fetch('https://tongji.090227.xyz/?id=// 替换为不带http(s)://的域名地址')
```

#### 你需要替换为真实的链接，如：
- 背景图：https://yourdomain.com/assets/bg.jpg

- 头像图：https://yourdomain.com/avatar.png

- ~~ICP 链接：https://icp.gov.moe/?keyword=萌ICP备XXXX号~~

- ~~UptimeRobot 链接：https://stats.uptimerobot.com/xxxxx~~

- 节点域名列表：

```html
const testSites = [
  { name: '节点1', url: 'https://节点1.com' },
  { name: '节点2', url: 'https://节点2.com' },
  ...
];

```
### 实例参考
[速溶理查的博客测速页](https://gateway.xn--sjq13yo4by51ezbkoum.dpdns.org/ "速溶理查的博客测速页")

![2fe595e6-69b4-4e7a-946d-77bab441cf22](https://github.com/user-attachments/assets/4c404b47-d57f-4f88-9546-e40088f2f000)
