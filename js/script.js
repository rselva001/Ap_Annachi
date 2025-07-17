function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById('profilePreview');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

// For the multiple file upload (community contributions)
document.getElementById('contributionUpload').addEventListener('change', function(event) {
  const files = event.target.files;
  if (files.length > 0) {
    alert(`You've selected ${files.length} file(s) for upload.`);
    // Here you would typically handle the file upload process
  }
});