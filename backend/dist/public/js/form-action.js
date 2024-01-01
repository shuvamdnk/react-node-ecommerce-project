// Register Form
$('#signupForm').submit(function(event){
    event.preventDefault();
    const FData = new FormData(this);
    const data = {};
    for (const [name, value] of FData.entries()) {
      data[name] = value
    }
    $.ajax({
      method:'POST',
      url:'/register',
      data:JSON.stringify(data),
      cache : false,
      processData: false, 
      contentType: 'application/json',
      success:function(res){
        if(res.errors){
          var html = `<ul>`;
          res.errors.forEach(err => {
            html += `<li class='text-danger fw-bold' >${err.msg}</li>`;
          });
          html += '</ul>';
        }

        if(res.status == 200){
          var html = `<ul>`;
            html += `<li class='text-success fw-bold'>${res.success}</li>`
          html += '</ul>';
        }

        $('#Msg').html(html);
      }
    });
})


// Login Form

$('#loginForm').submit(function(event){
  event.preventDefault();
  const FData = new FormData(this);
  const data = {};
  for (const [name, value] of FData.entries()) {
    data[name] = value
  }
  $.ajax({
    method:'POST',
    url:'/login',
    data:JSON.stringify(data),
    cache : false,
    processData: false, 
    contentType: 'application/json',
    success:function(res){
      if(res.errors){
        var html = `<ul>`;
        res.errors.forEach(err => {
          html += `<li class='text-danger fw-bold' >${err.msg}</li>`;
        });
        html += '</ul>';
      }

      if(res.status == 200){
        var html = `<ul>`;
          html += `<li class='text-success fw-bold'>${res.success}</li>`
        html += '</ul>';
      }
      $('#Msg').html(html);
      if(res.status == 200){
        window.location.href='/dashboard';
      }
    }
  });
})


// Student store form
$('#studentStoreForm').submit(function(event){
  event.preventDefault();
  const FData = new FormData(this);
  const data = {};
  for (const [name, value] of FData.entries()) {
    data[name] = value
  }
  // console.log(data);
  // console.log(FData);
  $.ajax({
    method:'POST',
    url:'/store-student',
    data:JSON.stringify(data),
    cache : false,
    processData: false, 
    contentType: 'application/json',
    success:function(res){
      if(res.errors){
        var html = `<ul>`;
        res.errors.forEach(err => {
          html += `<li class='text-danger fw-bold' >${err.msg}</li>`;
        });
        html += '</ul>';
      }

      if(res.status == 200){
        var html = `<ul>`;
          html += `<li class='text-success fw-bold'>${res.success}</li>`
        html += '</ul>';
      }
      $('#Msg').html(html);
      if(res.status == 200){
        window.location.href='/student';
      }
    }
  });
})


// Student update form

$('#studentUpdateForm').submit(function(event){
  event.preventDefault();
  const FData = new FormData(this);
  const data = {};
  for (const [name, value] of FData.entries()) {
    data[name] = value
  }
  $.ajax({
    method:'POST',
    url:'/student-update',
    data:JSON.stringify(data),
    cache : false,
    processData: false, 
    contentType: 'application/json',
    success:function(res){
      if(res.errors){
        var html = `<ul>`;
        res.errors.forEach(err => {
          html += `<li class='text-danger fw-bold' >${err.msg}</li>`;
        });
        html += '</ul>';
      }

      if(res.status == 200){
        var html = `<ul>`;
          html += `<li class='text-success fw-bold'>${res.success}</li>`
        html += '</ul>';
      }
      $('#Msg').html(html);
      if(res.status == 200){
        window.location.href='/student';
      }
    }
  });
})