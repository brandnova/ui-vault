import React, { useState } from "react"
import {
  Clock,
  User,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Download,
  Printer,
  Star,
  Shield,
  Heart,
  Brain,
  Eye,
  Stethoscope,
  ChevronDown,
  Info,
  CreditCard,
  CalendarIcon,
} from "lucide-react"

const DoctorBookingApp = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    insurance: "",
    emergencyContact: "",
    isNewPatient: true,
    preferredLanguage: "English",
    allergies: "",
    medications: "",
  })

  const specialties = [
    { id: "all", name: "All Specialties", icon: Stethoscope },
    { id: "cardiology", name: "Cardiology", icon: Heart },
    { id: "general", name: "General Practice", icon: Stethoscope },
    { id: "dermatology", name: "Dermatology", icon: Shield },
    { id: "neurology", name: "Neurology", icon: Brain },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
  ]

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "cardiology",
      specialtyName: "Cardiologist",
      rating: 4.9,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today",
      experience: "15 years",
      education: "Harvard Medical School",
      languages: ["English", "Mandarin"],
      consultationFee: 250,
      unavailableDates: []
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "general",
      specialtyName: "General Practice",
      rating: 4.8,
      reviewCount: 189,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Tomorrow",
      experience: "12 years",
      education: "Johns Hopkins University",
      languages: ["English", "Spanish"],
      consultationFee: 180,
      unavailableDates: [1, 5, 12]
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "dermatology",
      specialtyName: "Dermatologist",
      rating: 4.9,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1594824606847-42f7d2e5903e?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today",
      experience: "10 years",
      education: "Stanford Medical School",
      languages: ["English", "French"],
      consultationFee: 200,
      unavailableDates: [3, 8, 15]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "neurology",
      specialtyName: "Neurologist",
      rating: 4.7,
      reviewCount: 98,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "In 2 days",
      experience: "18 years",
      education: "Mayo Clinic",
      languages: ["English"],
      consultationFee: 300,
      unavailableDates: [2, 9, 16]
    }
  ];

  const timeSlots = {
    morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    afternoon: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
    evening: ["5:00 PM", "5:30 PM", "6:00 PM"],
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const today = new Date()
    const days = []

    // Add empty cells for days before the first day of the month
    const startPadding = firstDay.getDay()
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < today && !isToday
      const isUnavailable = selectedDoctor?.unavailableDates?.includes(day) || false

      days.push({
        date: date,
        day: day,
        isToday: isToday,
        isPast: isPast,
        isAvailable: !isPast && !isUnavailable,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  const filteredDoctors =
    selectedSpecialty === "all" ? doctors : doctors.filter((doctor) => doctor.specialty === selectedSpecialty)

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedDoctor
      case 2:
        return selectedDate
      case 3:
        return selectedTime
      case 4:
        return patientInfo.name && patientInfo.email && patientInfo.phone && patientInfo.insurance
      default:
        return false
    }
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    const today = new Date()
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(newMonth)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setPatientInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const downloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent("Appointment Confirmation - " + new Date().toISOString()),
    )
    element.setAttribute("download", "appointment-confirmation.pdf")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const printAppointment = () => {
    window.print()
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8 px-4 overflow-x-auto">
      {[
        { step: 1, label: "Doctor" },
        { step: 2, label: "Date" },
        { step: 3, label: "Time" },
        { step: 4, label: "Details" },
      ].map(({ step, label }) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step <= currentStep
                  ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <CheckCircle size={20} /> : step}
            </div>
            <span
              className={`mt-2 text-xs sm:text-sm font-medium ${
                step <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {step < 4 && (
            <div
              className={`w-10 sm:w-16 h-1 mx-2 sm:mx-4 mt-[-24px] transition-all duration-300 ${
                step < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const DoctorSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Choose Your Doctor</h2>
        <p className="text-gray-600 text-sm sm:text-base">Select from our experienced healthcare professionals</p>
      </div>

      {/* Specialty Filter */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center space-x-2">
            {React.createElement(specialties.find((s) => s.id === selectedSpecialty)?.icon || Stethoscope, {
              size: 20,
              className: "text-gray-500",
            })}
            <span className="text-gray-700">{specialties.find((s) => s.id === selectedSpecialty)?.name}</span>
          </div>
          <ChevronDown size={20} className="text-gray-400" />
        </button>
        {showSpecialtyDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => {
                  setSelectedSpecialty(specialty.id)
                  setShowSpecialtyDropdown(false)
                  setSelectedDoctor(null)
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
              >
                {React.createElement(specialty.icon, { size: 18, className: "text-gray-500" })}
                <span className="text-gray-700">{specialty.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => setSelectedDoctor(doctor)}
            className={`p-4 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedDoctor?.id === doctor.id
                ? "border-blue-500 bg-blue-50 shadow-xl ring-4 ring-blue-100"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-shrink-0">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium text-sm sm:text-base">{doctor.specialtyName}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{doctor.education}</p>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <div className="text-lg font-bold text-gray-900">${doctor.consultationFee}</div>
                    <div className="text-sm text-gray-500">consultation</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center mt-3 space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-1">
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>{doctor.experience} experience</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-green-600 font-medium">Available {doctor.nextAvailable}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const DateSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Pick a Date</h2>
        <p className="text-gray-600 text-sm sm:text-base">Choose when you'd like to see {selectedDoctor?.name}</p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            disabled={
              currentMonth.getMonth() === new Date().getMonth() &&
              currentMonth.getFullYear() === new Date().getFullYear()
            }
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <ArrowRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <button
                  onClick={() => day.isAvailable && setSelectedDate(day)}
                  disabled={!day.isAvailable}
                  className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 ${
                    !day.isAvailable
                      ? "text-gray-300 cursor-not-allowed"
                      : selectedDate?.day === day.day && selectedDate?.date.getMonth() === day.date.getMonth()
                        ? "bg-blue-600 text-white shadow-lg" // Removed transform scale-110
                        : day.isToday
                          ? "bg-blue-100 text-blue-600 hover:bg-blue-200 ring-2 ring-blue-300"
                          : day.isWeekend
                            ? "text-gray-400 hover:bg-gray-100"
                            : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {day.day}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  )

  const TimeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Select Time</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Available slots for{" "}
          {selectedDate?.date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {period} ({slots.length} slots available)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTime === time
                      ? "bg-blue-600 text-white shadow-lg" // Removed transform scale-105
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Clock size={16} />
                    <span>{time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const PatientInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Patient Information</h2>
        <p className="text-gray-600 text-sm sm:text-base">Please provide your details to complete the booking</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={patientInfo.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={patientInfo.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="(555) 123-4567"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider *</label>
            <select
              name="insurance"
              value={patientInfo.insurance}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select insurance</option>
              <option value="blue-cross">Blue Cross Blue Shield</option>
              <option value="aetna">Aetna</option>
              <option value="cigna">Cigna</option>
              <option value="united">United Healthcare</option>
              <option value="kaiser">Kaiser Permanente</option>
              <option value="self-pay">Self Pay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              name="emergencyContact"
              value={patientInfo.emergencyContact}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Emergency contact number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
            <textarea
              name="reason"
              value={patientInfo.reason}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows="3"
              placeholder="Brief description of your concern or symptoms"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
            <textarea
              name="medications"
              value={patientInfo.medications}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows="2"
              placeholder="List any current medications"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
            <textarea
              name="allergies"
              value={patientInfo.allergies}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows="2"
              placeholder="List any known allergies"
            />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="newPatient"
                name="isNewPatient"
                checked={patientInfo.isNewPatient}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="newPatient" className="text-sm text-gray-700">
                I am a new patient
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const Confirmation = () => (
    <div className="text-center space-y-8">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-600 text-sm sm:text-base">Your appointment has been successfully booked</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Appointment Details</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{selectedDoctor?.name}</div>
                  <div className="text-sm text-gray-600">{selectedDoctor?.specialtyName}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">
                  {selectedDate?.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{selectedTime}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">MedCenter Plaza, 123 Health St</span>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">${selectedDoctor?.consultationFee} consultation fee</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Patient Information</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{patientInfo.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{patientInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{patientInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">
                  {patientInfo.insurance
                    ? patientInfo.insurance.charAt(0).toUpperCase() + patientInfo.insurance.slice(1).replace("-", " ")
                    : "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800 text-left">
                <p className="font-medium mb-1">Important Reminders:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Please arrive 15 minutes early for check-in</li>
                  <li>• Bring a valid ID and insurance card</li>
                  <li>• Wear a mask if you have cold/flu symptoms</li>
                  <li>• Confirmation email sent to {patientInfo.email}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadPDF}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={printAppointment}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Printer size={20} />
              <span>Print Details</span>
            </button>

            <button
              onClick={() => {
                const message = `Hi, I have an appointment with ${selectedDoctor?.name} on ${selectedDate?.date.toLocaleDateString()} at ${selectedTime}. Confirmation for ${patientInfo.name}.`
                window.open(`sms:${patientInfo.phone}?body=${encodeURIComponent(message)}`, "_blank")
              }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone size={20} />
              <span>Send SMS</span>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => {
            setCurrentStep(1)
            setSelectedDate(null)
            setSelectedTime(null)
            setSelectedDoctor(null)
            setSelectedSpecialty("all")
            setCurrentMonth(new Date())
            setPatientInfo({
              name: "",
              email: "",
              phone: "",
              reason: "",
              insurance: "",
              emergencyContact: "",
              isNewPatient: true,
              preferredLanguage: "English",
              allergies: "",
              medications: "",
            })
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Book Another Appointment
        </button>

        <div className="text-sm text-gray-500">
          Need to reschedule? Call us at (555) 123-HEALTH or email support@medcenter.com
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DoctorSelection />
      case 2:
        return <DateSelection />
      case 3:
        return <TimeSelection />
      case 4:
        return <PatientInfo />
      case 5:
        return <Confirmation />
      default:
        return <DoctorSelection />
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {" "}
      {/* Changed gradient background to solid color */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">MedCenter</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Easy, fast, and secure healthcare scheduling with top-rated physicians
            </p>
          </div>

          {/* Step Indicator */}
          {currentStep < 5 && <StepIndicator />}

          {/* Main Content */}
          <div
            className={`${
              currentStep === 5 ? "bg-transparent" : "bg-white"
            } rounded-3xl ${currentStep === 5 ? "" : "shadow-2xl"} ${currentStep === 5 ? "p-0" : "p-4 sm:p-8"} mb-8`}
          >
            <div className="transition-all duration-500 ease-in-out">{renderStep()}</div>
          </div>

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex justify-between items-center px-4 sm:px-0">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800 bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-right">
                {currentStep === 4 && (
                  <div className="text-xs sm:text-sm text-gray-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </div>
                )}
                <button
                  onClick={() => (currentStep === 4 ? setCurrentStep(5) : nextStep())}
                  disabled={!canProceed()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    canProceed()
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl" // Removed transform
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span>{currentStep === 4 ? "Confirm Appointment" : "Continue"}</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorBookingApp
