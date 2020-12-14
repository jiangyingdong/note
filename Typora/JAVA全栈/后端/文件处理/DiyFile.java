package model.common;

import java.io.*;

public class DiyFile {
    /**
     * 将字符串写入文件,覆盖之前的内容
     * @param file
     * @param data
     * @return
     */
    public boolean writeFile(File file, String data){
        try {
            FileWriter fileWriter = new FileWriter(file);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(data);
            bufferedWriter.flush();
            bufferedWriter.close();
            fileWriter.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    /**
     * 将二进制数组写入文件,覆盖之前的内容
     * @param file
     * @param data
     * @return
     */
    public boolean writeFile(File file, byte[] data){
        try {
            FileOutputStream fileWriter = new FileOutputStream(file);
            BufferedOutputStream bufferedWriter = new BufferedOutputStream(fileWriter);
            bufferedWriter.write(data);
            bufferedWriter.flush();
            bufferedWriter.close();
            fileWriter.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 读取文件所有内容
     * @param file
     * @return
     */
    public String readFile(File file){
        try {
            StringBuffer allData = new StringBuffer();
            FileReader fileReader = new FileReader(file);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            for (String data = bufferedReader.readLine();data!=null;data = bufferedReader.readLine()){
                allData.append(data+"\n");
            }
            bufferedReader.close();
            fileReader.close();
            return allData.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 读取文件所有内容到一个二进制数组中
     * @param file
     * @return
     */
    public byte[] readFileByByte(File file){
        try {
            FileInputStream fileReader = new FileInputStream(file);
            BufferedInputStream bufferedReader = new BufferedInputStream(fileReader);
            byte[] b = new byte[(int)file.length()];
            bufferedReader.read(b);
            bufferedReader.close();
            fileReader.close();
            return b;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 检查文件的存在性,不存在则创建相应的路由，文件
     * @param filepath
     * @return 创建失败则返回null
     */
    public File checkFileExistence(String filepath){
        File file = new File(filepath);
        try {
            if (!file.exists()){
                if (!file.isDirectory()){
                    file.createNewFile();
                }else {
                    file.mkdirs();
                }
            }
        }catch (IOException e) {
            e.printStackTrace();
            file = null;
        }
        return file;
    }
}
