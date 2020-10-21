# Win10找不到gpedit.msc|找不到本地组策略编辑器的解决方法

本地组策略编辑器是一个 Microsoft 管理控制台 (MMC) 管理单元，它提供一个单一用户界面，通过该界面可管理本地组策略对象（GPOs）。通常打开方式都是按 Win + R 组合键，打开运行，并输入：gpedit.msc 命令，确定或回车打开本地组策略编辑器，可有些用户在输入：gpedit.msc 命令后，却提示：[Windows](http://www.baiyunxitong.com/soft/windows/) 找不到文件“gpedit.msc”。请确定文件名是否正确后，再试一次。这篇文章就是白云一键重装系统给大家带来的方法教程。



![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q13K0316.png)


方法/教程

1、右键点击桌面空白处，然后在打开的菜单项中，新建文本文档；



![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q151351E.png)


2、然后，输入以下代码到刚刚新建的文本文档下，当然最简单的方法就是直接复制粘贴到新建的文本文档，最后按保存即可；

@echo off

pushd "%~dp0"

dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt

dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt

for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"C:\Windows\servicing\Packages\%%i"

pause

3、文件名大家可以随便自定义，这里我重命名的名称是系统组件，不过名字什么的不重要，重要的是，后缀要为cmd；



![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q15516127.png)


4、为了成功运行这个cmd文件，可以直接右键点击这个cmd文件，在打开的菜单项中，选择以管理员身份运行；



![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q1564X43.png)


5、最后，是cmd这个程序的执行过程，等待程序执行完成后，就能够重新打开本地组策略编辑器了；



![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q15R51D.png)
 

![gpedit.msc,本地组策略编辑器步骤](http://www.baiyunxitong.com/uploads/allimg/190628/6-1Z62Q15SG28.png)

