import cv2
import numpy
import os

file_path_name = '../../网站'
for a,b,c in os.walk(file_path_name): #遍历网站文件夹
    for bb in b: #遍历网站文件夹下的文件夹名称
        if bb=='Python 学习':
            for bb_path, bb_folders, bb_files in os.walk(a+'\\'+bb): #遍历指定文件夹
            
                #更新首页网页
                if bb_path==a+'\\'+bb:
                    home_page = open(file_path_name+'/首页.html', 'rt', encoding='utf-8') #读取首页文件
                    data_home_page = home_page.read() #用于存放修改后的首页数据
                    home_page.close()
                    index1 = data_home_page.find('<pre>') #数据插入开始位置
                    index2 = data_home_page.find('</pre>') #数据插入结束位置
                    data = '①Python 学习\n' #要插入的数据
                    for x in bb_files:
                        data += '\t<a href=\'./Python 学习/'+x+'\'>'+x+'</a>\n'
                    data_home_page = data_home_page.replace(data_home_page[index1+6:index2], data)
                    home_page = open(file_path_name+'/首页.html', 'wt', encoding='utf-8')
                    home_page.write(data_home_page)
                    home_page.close()
                    print(file_path_name+'/首页.html', data)
            
                for bb_file in bb_files: #查找网页文件并且给网页文件内的注释修改样式
                    if(bb_file.find('.html') != -1):
                        file_path_name = bb_path+'\\'+bb_file #网页文件的路径
                        print(file_path_name)
                        #读取并修改文件
                        file = open(file_path_name, 'rt', encoding='utf-8')
                        file_data = '' #用于存放读取的整个文件数据
                        while 1: #按行读取
                            data = file.readline()
                            if not data: #没有内容则读取结束
                                break       
                            if data == '\n': #去掉空行
                                data = ''
                            index = data.find('#')
                            if index != -1:
                                if data.find('<span>',index-6) == -1: #给没有样式的添加样式
                                    l = list(data)
                                    l.insert(index, '<span>')
                                    l.insert(len(data), '</span>')
                                    data = ''.join(l)
                            file_data = file_data+data
                        file.close()
                        file = open(file_path_name, 'wt', encoding='utf-8')
                        file.write(file_data)
                        file.close()