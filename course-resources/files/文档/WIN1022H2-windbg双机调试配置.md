## 虚拟机下载安装

https://next.itellyou.cn/Original/#cbp=Product?ID=f905b2d9-11e7-4ee3-8b52-407a8befe8d1

![image-20260526125155141](/Users/changmen/Library/Application%20Support/typora-user-images/image-20260526125155141.png)

## cmd

很简单，cmd管理员打开，按照下面输入就行了

```c
bcdedit

bcdedit /copy {current} /d debug


bcdedit /displayorder {6ebe99f0-cf67-11eb-99ea-000c2915a63a} /addlast

bcdedit /dbgsettings SERIAL DEBUGPORT:1 BAUDRATE:115200

 bcdedit /bootdebug {6ebe99f0-cf67-11eb-99ea-000c2915a63a} ON


bcdedit /debug {6ebe99f0-cf67-11eb-99ea-000c2915a63a} ON

bcdedit /timeout 30

:: 1. 开启测试签名（允许加载未签名/自签名 .sys）
bcdedit /set {6ebe99f0-cf67-11eb-99ea-000c2915a63a} testsigning on


//虚拟机配置

"F:\Windows Kits\10\Debuggers\x64\windbg.exe" -b -k com:port=\\.\pipe\com_1,baud=115200,pipe
```

那一串6ebe99f0-cf67-11eb-99ea-000c2915a63a换成我们自己的8b207d89-3cbd-11f1-a471-bcd341860c2b

![3d0b51d3f7a531303318ec568b4785c0](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/3d0b51d3f7a531303318ec568b4785c0.png)

执行完关机

![44ae0c9d240f90d7afe7787b82745f16](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/44ae0c9d240f90d7afe7787b82745f16.png)

## 在虚拟机设置加串口端口

```
\\.\pipe\com_1
```

![5c9216bfb37cf235df9d21659cb46412](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/5c9216bfb37cf235df9d21659cb46412.png)



## windbg快捷方式配置

```
"F:\Windows Kits\10\Debuggers\x64\windbg.exe" -b -k com:port=\\.\pipe\com_1,baud=115200,pipe
```

![9c056e684d1c5a8fa98ffce307e2aac5](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/9c056e684d1c5a8fa98ffce307e2aac5.png)

此时开机选择debug即可

![caf4fc6ccfe9cd9c1844481a9c0dee29](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/caf4fc6ccfe9cd9c1844481a9c0dee29.png)

然后打开配置好的windbg，静静等待，有时候第一次很慢。

## 一些额外配置

```
kd> .sympath SRV*c:\mySymbols*http://msdl.microsoft.com/download/symbols
kd> .reload
kd> g
kd> g
kd> ed nt!Kd_SXS_Mask 0
kd> ed nt!Kd_FUSION_Mask 0
kd> u KiSystemServiceUser
```

## ok

![72aad11372a80a628ed1bc9962046200](https://cdn.jsdelivr.net/gh/250wuyifan/WaiLian250/img/72aad11372a80a628ed1bc9962046200.jpg)

## 参考文章

https://www.lyshark.com/post/f6760159.html

