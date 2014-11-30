// Generated by CoffeeScript 1.8.0
$(document).ready(function() {
  var EMAIL_KEY, emailId;
  EMAIL_KEY = 'emailId';
  emailId = localStorage.getItem(EMAIL_KEY);
  if (emailId) {
    $.ajax({
      type: "GET",
      url: serverHost + "/checkUser/" + emailId,
      dataType: "json"
    }).done(function(respData) {
      if (respData.status === 'SUCCESS') {
        window.location.hash = "#home";
        if (respData.popupflag === true) {
          $(".usagewarning").popup("open");
        }
      } else {
        $('#login').show();
      }
    });
  } else {
    $('#login').show();
  }
  return $("#registrationForm").on("submit", function($event) {
    var email, invitedMembers, mobileno, postData, size, usrname;
    $event.preventDefault();
    usrname = $(".usrname").val();
    email = $(".email").val();
    mobileno = $(".mobileno").val();
    size = $(".peopleinhome").val();
    invitedMembers = $(".inviteemail").each(function(i, elem) {
      return $(elem).val();
    });
    return;
    postData = {
      residentName: usrname,
      emailId: email,
      mobileNumber: mobileno,
      peopleInHome: size,
      invitedMembers: invitedMembers
    };
    $.ajax({
      type: "POST",
      url: serverHost + "/createUser",
      crossDomain: true,
      data: postData,
      dataType: "json"
    }).done(function(respData) {
      if (respData.status === 'SUCCESS') {
        localStorage.setItem(EMAIL_KEY, email);
        window.location.hash = "#home";
      }
    }).fail(function() {});
    return false;
  });
});

$(document).ready(function() {
  var chartMetaData;
  $(".pledge").on("click", function() {
    $(".usagewarning").popup("close");
    setTimeout(function() {
      return $(".restorewater").popup("open");
    }, 1000);
    return setTimeout(function() {
      return $(".restorewater").popup("close");
    }, 5000);
  });
  $(".leaveit").on("click", function() {
    $('.usagewarning').popup('close');
    return setTimeout(function() {
      return $('.icon-Pledge').show();
    }, 1000);
  });
  return;
  chartMetaData = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rainfall (mm)"
      }
    },
    tooltip: {
      headerFormat: "<span style=\"font-size:10px\">{point.key}</span><table>",
      pointFormat: "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" + "<td style=\"padding:0;width:15px;\"><b>{point.y:.1f} mm</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: []
  };
  return $('.tabClick').on("click", function() {
    var freq;
    freq = $(this).data('frequency');
    $.ajax({
      type: "GET",
      url: serverHost + "/usageMetrics?flatId=b502&frequency=" + freq,
      crossDomain: true,
      dataType: "json"
    }).done(function(responseData) {
      chartMetaData.xAxis.categories = responseData.data.periods;
      chartMetaData.series = responseData.data.usages;
      $('.charArea').html('');
      $('.charArea.' + freq).highcharts(chartMetaData);
    }).fail(function() {});
    return false;
  });
});
