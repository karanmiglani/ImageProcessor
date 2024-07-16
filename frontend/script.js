document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('upload');
    if(button){
    button.addEventListener('click', async (e) => {
        e.preventDefault();

        const uploadedFile = document.getElementById('formFile').files[0];
        if (!uploadedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadedFile);

        const url = 'http://localhost:4000/api/upload';
        button.textContent = 'Please wait...';
        button.disabled = true;

        try {
            let response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // Optionally display a success message to the user
            document.getElementById('msg').innerHTML = `You request id is ${data.requestId}.<br> Please wait while we are prcoessing your file`
            alert('File uploaded successfully!');
        } catch (err) {
            console.error('There was a problem with the fetch operation:', err);
            // Optionally display an error message to the user
            alert('File upload failed. Please try again.');
        } finally {
            button.textContent = 'Upload';
            button.disabled = false;
        }
    });
}

    const button2 = document.getElementById('get-request-status')
    if(button2){
        button2.addEventListener('click' , async(e) => {
            let requestId = document.getElementById('request-id').value
            const url = `http://localhost:4000/api/status?requestId=${requestId}`
            button2.textContent = 'Please wait....'
            button2.disabled = true;
           try{
            let resp = await fetch(url , {
                method : "GET",
            })
            resp = await resp.json();
            console.log(resp);
            if(resp.status === 'completed'){
                document.getElementById('msg').innerHTML = 'Your request is completed'
                document.getElementById('msg').classList.remove('text-danger')
                document.getElementById('msg').classList.add('text-success')
            }else{
                document.getElementById('msg').innerHTML = `Your request is  ${resp.status}`
            }
           }catch(e){
            document.getElementById('msg').innerHTML = 'Internal server error, Please try again.'
            console.log(e.message);
           }finally{
            button2.textContent = 'Get Request Status'
            button2.disabled = false;
           }
        })
    }
    
});
