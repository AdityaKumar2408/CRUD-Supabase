
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const multer=require('multer');
const { createClient }=require('@supabase/supabase-js');
const dotenv = require('dotenv')

const app=express();
app.use(cors());
app.use(express.json());

const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
const fetchUsers=async () => {
    try {
        const res=await axios.get(`${process.env.VITE_BACKEND_URL}users`);
        console.log("Users:",res.data); 
        setUsers(res.data);
    } catch (error){
        console.error("Error fetching users:",error);
    }
};
const storage=multer.memoryStorage();
const upload=multer({ storage: storage });
app.post('/users',upload.single('image'),async (req,res) => {
    try {
        const { name,email,mobile,address }=req.body;
      if(!name||!email||!mobile||!address){
            return res.status(400).json({ message: "All fields are required." });
        }
        const { data: user,error: userError }=await supabase
            .from('users')
            .insert([{ name,email,mobile,address }])
            .select('id')
            .single();

        if(userError){
            console.error("User Insert Error:",userError);
            return res.status(500).json({ message: "Error inserting user",error: userError });
        }

        let imageUrl=null;
        if(req.file){
            const fileExt=req.file.originalname.split('.').pop();
            const fileName=`user_${user.id}.${fileExt}`;
            const { data: uploadData,error: uploadError }=await supabase.storage
                .from('user_images')
                .upload(`public/${fileName}`,req.file.buffer,{
                    contentType: req.file.mimetype,
                    upsert: true,
                });

            if(uploadError){
                console.error("Image Upload Error:",uploadError);
                return res.status(500).json({ message: "Error uploading image",error: uploadError });
            }

            imageUrl=`${process.env.SUPABASE_URL}/storage/v1/object/public/user_images/public/${fileName}`;
   const { error: imageError }=await supabase
                .from('profile_images')
                .insert([{ user_id: user.id,image_url: imageUrl }]);

            if(imageError){
                console.error("Profile Image Insert Error:",imageError);
                return res.status(500).json({ message: "Error saving image record",error: imageError });
            }
        }

        return res.json({ message: "User added successfully",user_id: user.id,imageUrl });
    } catch (error){
        console.error("Server Error:",error);
        return res.status(500).json({ message: "Server error",error });
    }
});

app.get('/users',async (req,res) => {
    try {
        const { data: users,error: usersError }=await supabase
            .from('users')
            .select('id,name,email,mobile,address,profile_images (image_url)');

        if(usersError){
            return res.status(500).json({ message: "Error fetching users",error: usersError });
        }
        const usersWithImages=users.map(user => ({
            ...user,
            image_url: user.profile_images?.image_url||null,
        }));

        res.json(usersWithImages);
    } catch (error){
        res.status(500).json({ message: "Server error",error });
    }
});
app.put('/users/:id',upload.single('image'),async (req,res) => {
    try {
        const { id }=req.params;
        const { name,email,mobile,address }=req.body;
        if(!name||!email||!mobile||!address){
            return res.status(400).json({ message: "All fields are required." });
        }
        const { data: user,error: userError }=await supabase
            .from('users')
            .update({ name,email,mobile,address })
            .eq('id',id)
            .select('id')
            .single();
        if(userError){
            return res.status(500).json({ message: "Error updating user",error: userError });
        }
        let imageUrl=null;
        if(req.file){
            const fileExt=req.file.originalname.split('.').pop();
            const fileName=`user_${user.id}.${fileExt}`;
            const { data: uploadData,error: uploadError }=await supabase.storage
                .from('user_images')
                .upload(`public/${fileName}`,req.file.buffer,{
                    contentType: req.file.mimetype,
                    upsert: true,
                });
            if(uploadError){
                return res.status(500).json({ message: "Error uploading image",error: uploadError });
            }
            imageUrl=`${process.env.SUPABASE_URL}/storage/v1/object/public/user_images/public/${fileName}`;
            const { data: existingImage,error: existingImageError }=await supabase
                .from('profile_images')
                .select('id')
                .eq('user_id',user.id)
                .single();
            if(existingImage){
                await supabase
                    .from('profile_images')
                    .update({ image_url: imageUrl })
                    .eq('user_id',user.id);
            } else {
                await supabase
                    .from('profile_images')
                    .insert([{ user_id: user.id,image_url: imageUrl }]);
            }
        }
        return res.json({ message: "User updated successfully",user_id: user.id,imageUrl });
    } catch (error){
        return res.status(500).json({ message: "Server error",error });
    }
});
app.delete('/users/:id',async (req,res) => {
    try {
        const { id }=req.params;
        const { data: profileImage,error: imageError }=await supabase
            .from('profile_images')
            .select('image_url')
            .eq('user_id',id)
            .single();
        if(profileImage?.image_url){
            const filePath=profileImage.image_url.split('/storage/v1/object/public/user_images/')[1];
            await supabase.storage.from('user_images').remove([filePath]);
        }
        await supabase.from('profile_images').delete().eq('user_id',id);
        await supabase.from('users').delete().eq('id',id);
        return res.json({ message: "User deleted successfully" });
    } catch (error){
        return res.status(500).json({ message: "Server error",error });
    }
});

const PORT=5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));