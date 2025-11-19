import { useState } from "react";
import svgPaths from "./imports/svg-w8ytru3i4b";
import imgBackgroundNew from "figma:asset/a107621ba60cf0fff8e8329f1c3a5b5f908ea8ba.png";
import imgAvatar from "figma:asset/e0a99f97de8094efc7d4ab40c1dd960bd913fa37.png";
import imgAvatar1 from "figma:asset/54e769a5e4f656bd47713604ba15edbe71b0da5e.png";
import imgAvatar2 from "figma:asset/aaaac5c14f939d7461a65be1c23c3f23602ff76e.png";
import imgImage from "figma:asset/848bfa7e8943a890d84f577036cf23a0081bfa38.png";
import imgAvatar3 from "figma:asset/1ed0e49a8466256e989bd4f6649dd5adce961dcf.png";
import imgAvatar4 from "figma:asset/51a48f8a78bd6fac38f3fbbf5ca9e1690c8901bb.png";
import imgAvatar5 from "figma:asset/664b52c5e8f7e99d7dd976c9757c386d505da93b.png";
import imgAvatar6 from "figma:asset/0b53aa7ca0432422ebd81a7e32e52b4dd4dc9acd.png";
import imgAvatar7 from "figma:asset/a124b3a6535f63a7c1b26ec344823bcc80db152d.png";
import imgAvatar8 from "figma:asset/91883909e9f3fd5720ab2c495df4ad4aa498be8e.png";
import imgRectangle3468451 from "figma:asset/9b43b037b1d63fb440b926d80b3c4b3dd0bc258b.png";
import { imgImperialPeacock } from "./imports/svg-lhusm";
import { ChevronDown } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  entity: string;
  jobTitle: string;
  nationality: string;
  education: string;
  avatar: string;
  performance: number;
}

const employees: Employee[] = [
  { id: 1, name: "Ahmed Abbas", entity: "Department 1", jobTitle: "Project Coordinator", nationality: "Emirati", education: "Bachelor's", avatar: imgAvatar, performance: 5 },
  { id: 2, name: "Aisha Hariri", entity: "Department 2", jobTitle: "Project Coordinator", nationality: "Emirati", education: "Master's", avatar: imgAvatar1, performance: 5 },
  { id: 3, name: "Amal Abbas", entity: "Department 3", jobTitle: "Finance VP", nationality: "Emirati", education: "Bachelor's", avatar: imgAvatar2, performance: 5 },
  { id: 4, name: "Amir Haddad", entity: "Department 4", jobTitle: "Project Coordinator", nationality: "Emirati", education: "Master's", avatar: imgImage, performance: 5 },
  { id: 5, name: "Faisal Hussein", entity: "Department 1", jobTitle: "Finance VP", nationality: "Saudi", education: "MBA", avatar: imgAvatar3, performance: 5 },
  { id: 6, name: "Fatima Khalil", entity: "Department 2", jobTitle: "Project Coordinator", nationality: "Emirati", education: "Bachelor's", avatar: imgAvatar4, performance: 5 },
  { id: 7, name: "Hassan Rashid", entity: "Department 3", jobTitle: "Manager", nationality: "Kuwaiti", education: "Master's", avatar: imgAvatar5, performance: 5 },
  { id: 8, name: "Layla Ahmed", entity: "Department 1", jobTitle: "Analyst", nationality: "Emirati", education: "Bachelor's", avatar: imgAvatar6, performance: 5 },
  { id: 9, name: "Mohammed Karim", entity: "Department 2", jobTitle: "Director", nationality: "Saudi", education: "PhD", avatar: imgAvatar7, performance: 5 },
  { id: 10, name: "Noor Al Fahad", entity: "Department 4", jobTitle: "Coordinator", nationality: "Emirati", education: "Master's", avatar: imgAvatar8, performance: 5 },
  { id: 11, name: "Saeed Al Mansoori", entity: "Department of Energy", jobTitle: "Finance VP", nationality: "Emirati", education: "MBA", avatar: imgRectangle3468451, performance: 5 },
];

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[10]);
  const [filters, setFilters] = useState({
    entity: "All",
    employeeName: "All",
    employmentType: "All",
    nationality: "All",
    education: "All",
    managerName: "All"
  });

  const filteredEmployees = employees.filter(emp => {
    if (filters.entity !== "All" && emp.entity !== filters.entity) return false;
    if (filters.employeeName !== "All" && emp.name !== filters.employeeName) return false;
    if (filters.nationality !== "All" && emp.nationality !== filters.nationality) return false;
    return true;
  });

  return (
    <div className="bg-[#07080a] relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="absolute h-full left-0 opacity-80 overflow-clip top-0 w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[128.81%] left-[-2.61%] max-w-none top-[-18.56%] w-[108.54%]" src={imgBackgroundNew} />
        </div>
      </div>

      {/* Header */}
      <div className="absolute box-border content-stretch flex gap-[685px] items-center left-1/2 px-[128px] py-0 top-0 translate-x-[-50%] w-full max-w-[2560px]">
        <div className="h-[63px] overflow-clip relative shrink-0 w-[177px]">
          <p className="absolute font-['Segoe_UI:Bold',sans-serif] leading-[56px] left-[47.5px] not-italic text-[40px] text-center text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Logo</p>
        </div>
        <div className="basis-0 box-border content-stretch flex grow items-center justify-center min-h-px min-w-px pb-0 pt-[64px] px-0 relative shrink-0">
          <p className="font-['Segoe_UI:Bold',sans-serif] leading-[56px] not-italic relative shrink-0 text-[#f1f3f9] text-[40px] text-center text-nowrap whitespace-pre">Talent Card</p>
        </div>
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic pb-0 pt-[58px] px-0 relative shrink-0 text-[#f1f3f9] text-[16px] text-right w-[177px]">
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center relative shrink-0 w-full">
            <p className="leading-[normal]">Refreshed</p>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center relative shrink-0 w-full">
            <p className="leading-[normal]">Jan 27, 2025 16:30</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[128px] top-[180px] right-[128px] bottom-[200px]">
        {/* Filters */}
        <div className="content-stretch flex gap-[16px] items-end relative shrink-0">
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
            {/* Entity Filter */}
            <FilterDropdown label="Entity" value={filters.entity} onChange={(v) => setFilters({...filters, entity: v})} />
            
            {/* Employee Name Filter */}
            <FilterDropdown label="Employee Name" value={filters.employeeName} onChange={(v) => setFilters({...filters, employeeName: v})} />
            
            {/* Employment Type Filter */}
            <FilterDropdown label="Employment Type" value={filters.employmentType} onChange={(v) => setFilters({...filters, employmentType: v})} />
            
            {/* Nationality Filter */}
            <FilterDropdown label="Nationality" value={filters.nationality} onChange={(v) => setFilters({...filters, nationality: v})} />
            
            {/* Education Filter */}
            <FilterDropdown label="Education" value={filters.education} onChange={(v) => setFilters({...filters, education: v})} />
            
            {/* Manager Name Filter */}
            <FilterDropdown label="Manager Name" value={filters.managerName} onChange={(v) => setFilters({...filters, managerName: v})} />
          </div>
          
          {/* Reset Button */}
          <div className="box-border content-stretch flex flex-col h-[68px] items-start pb-0 pt-[28px] px-0 relative shrink-0 w-[116px]">
            <button 
              onClick={() => setFilters({ entity: "All", employeeName: "All", employmentType: "All", nationality: "All", education: "All", managerName: "All" })}
              className="bg-[#1a1c23] h-[40px] relative shrink-0 w-full border border-[#20242c] hover:bg-[#262b35] transition-colors"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative w-full">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[14px] text-center text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Reset Filters</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Table and Preview */}
        <div className="basis-0 content-stretch flex gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden">
          {/* Table */}
          <div className="bg-[#1a1c23] box-border content-stretch flex flex-col gap-[24px] h-full items-start overflow-x-clip overflow-y-auto p-[24px] relative rounded-[8px] shrink-0 w-[1335px]">
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[24px] w-full">
                  <p className="leading-[normal]">Talent List</p>
                </div>
              </div>
            </div>
            
            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full">
              {/* Table Header */}
              <div className="content-stretch flex items-center relative shrink-0 w-full">
                <div className="bg-[#333947] box-border content-stretch flex gap-[10px] h-[62px] items-center p-[16px] relative shrink-0">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Photo</p>
                  </div>
                </div>
                <div className="basis-0 bg-[#333947] grow h-[62px] min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[10px] h-[62px] items-center p-[16px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">Full Name</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-0 bg-[#333947] grow h-[62px] min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[10px] h-[62px] items-center p-[16px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">Entity Name</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-0 bg-[#333947] grow h-[62px] min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[10px] h-[62px] items-center p-[16px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">Job Title</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#333947] box-border content-stretch flex gap-[10px] h-[62px] items-center p-[16px] relative shrink-0">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Performance</p>
                  </div>
                </div>
              </div>
              
              {/* Table Rows */}
              {filteredEmployees.map((emp, idx) => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`content-stretch flex items-center relative shrink-0 w-full hover:brightness-110 transition-all ${
                    selectedEmployee.id === emp.id ? 'ring-2 ring-[#4d9aef]' : ''
                  }`}
                >
                  <div className={`${idx % 2 === 0 ? 'bg-[#1a1c23]' : 'bg-[#20242c]'} box-border content-stretch flex gap-[16px] h-[62px] items-center justify-center p-[16px] relative shrink-0 w-[78px] border-[#444c5f] border-[0px_1px_1px_0px] border-solid`}>
                    <img alt={emp.name} className="rounded-[40px] size-[32px] object-cover" src={emp.avatar} />
                  </div>
                  <div className={`basis-0 ${idx % 2 === 0 ? 'bg-[#1a1c23]' : 'bg-[#20242c]'} grow h-[62px] min-h-px min-w-px relative shrink-0 border-[#333947] border-[0px_1px_1px] border-solid`}>
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border content-stretch flex gap-[16px] h-[62px] items-center p-[16px] relative w-full">
                        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                          <p className="leading-[normal] whitespace-pre">{emp.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`basis-0 ${idx % 2 === 0 ? 'bg-[#1a1c23]' : 'bg-[#20242c]'} grow h-[62px] min-h-px min-w-px relative shrink-0 border-[#333947] border-[0px_1px_1px] border-solid`}>
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border content-stretch flex gap-[16px] h-[62px] items-center p-[16px] relative w-full">
                        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                          <p className="leading-[normal] whitespace-pre">{emp.entity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`basis-0 ${idx % 2 === 0 ? 'bg-[#1a1c23]' : 'bg-[#20242c]'} grow h-[62px] min-h-px min-w-px relative shrink-0 border-[#333947] border-[0px_1px_1px] border-solid`}>
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border content-stretch flex gap-[16px] h-[62px] items-center p-[16px] relative w-full">
                        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[16px] text-nowrap">
                          <p className="leading-[normal] whitespace-pre">{emp.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${idx % 2 === 0 ? 'bg-[#1a1c23]' : 'bg-[#20242c]'} box-border content-stretch flex gap-[16px] h-[62px] items-center justify-center p-[16px] relative shrink-0 w-[129px] border-[#333947] ${idx === filteredEmployees.length - 1 ? 'border-[1px_0px_1px_1px]' : 'border-[0px_0px_1px_1px]'} border-solid`}>
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      {[...Array(emp.performance).keys()].map((_, i) => (
                        <div key={i} className="relative shrink-0 size-[16px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p30025c80} fill="#F6D04C" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Preview Card */}
          <div className="bg-[#1a1c23] basis-0 grow min-h-px min-w-px rounded-[8px] h-full flex flex-col">
            <div className="flex flex-col items-start overflow-y-auto rounded-[inherit] size-full">
              <div className="box-border content-stretch flex flex-col gap-[32px] items-start p-[32px] relative w-full">
                {/* Header */}
                <div className="content-stretch flex gap-[24px] items-start justify-between relative shrink-0 w-full">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[24px]">
                    <p className="leading-[normal]">Talent Card Preview</p>
                  </div>
                  <button className="bg-[#262b35] box-border content-stretch flex gap-[16px] h-[40px] items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#2d3340] transition-colors">
                    <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[14px] text-center text-nowrap">
                      <p className="leading-[normal] whitespace-pre">Details</p>
                    </div>
                    <svg className="h-[12.33px] w-[6.61px]" fill="none" preserveAspectRatio="none" viewBox="0 0 7 13">
                      <path d={svgPaths.p2bbc2b00} fill="#C1C8D5" />
                    </svg>
                  </button>
                </div>
                
                {/* Avatar Section - Centered */}
                <div className="content-stretch flex flex-col gap-[20px] items-center justify-center relative shrink-0 w-full">
                  <img alt={selectedEmployee.name} className="rounded-[999px] size-[120px] object-cover shadow-lg" src={selectedEmployee.avatar} />
                  <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                    {[...Array(selectedEmployee.performance).keys()].map((_, i) => (
                      <div key={i} className="relative shrink-0 size-[20px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <path d={svgPaths.p30025c80} fill="#F6D04C" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Name and Title Section */}
                <div className="content-stretch flex flex-col gap-[16px] items-center text-center relative shrink-0 w-full">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[28px] w-full">
                    <p className="leading-[1.2]">{selectedEmployee.name}</p>
                  </div>
                  <div className="flex flex-col gap-[8px] items-center w-full">
                    <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4d9aef] text-[20px]">
                      <p className="leading-[normal]">{selectedEmployee.jobTitle}</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#c1c8d5] text-[16px]">
                      <p className="leading-[normal]">{selectedEmployee.entity}</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8b92a3] text-[14px]">
                      <p className="leading-[normal]">Abu Dhabi, UAE</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[#333947]"></div>
                
                {/* Details Grid */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[18px] w-full mb-2">
                    <p className="leading-[normal]">Employee Details</p>
                  </div>
                  
                  {/* Nationality */}
                  <div className="bg-[#20242c] rounded-[8px] w-full p-[20px] hover:bg-[#262b35] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#8b92a3] text-[13px]">
                          <p className="leading-[normal]">NATIONALITY</p>
                        </div>
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#f1f3f9] text-[18px]">
                          <p className="leading-[normal]">{selectedEmployee.nationality}</p>
                        </div>
                      </div>
                      <svg className="relative shrink-0 size-[28px] opacity-70" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p556f6c0} fill="#4d9aef" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Education */}
                  <div className="bg-[#20242c] rounded-[8px] w-full p-[20px] hover:bg-[#262b35] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#8b92a3] text-[13px]">
                          <p className="leading-[normal]">EDUCATION</p>
                        </div>
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#f1f3f9] text-[18px]">
                          <p className="leading-[normal]">{selectedEmployee.education}</p>
                        </div>
                      </div>
                      <svg className="relative shrink-0 size-[28px] opacity-70" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p27671570} fill="#4d9aef" />
                      </svg>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="bg-[#20242c] rounded-[8px] w-full p-[20px] hover:bg-[#262b35] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#8b92a3] text-[13px]">
                          <p className="leading-[normal]">DEPARTMENT</p>
                        </div>
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#f1f3f9] text-[18px]">
                          <p className="leading-[normal]">{selectedEmployee.entity}</p>
                        </div>
                      </div>
                      <svg className="relative shrink-0 size-[28px] opacity-70" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p5112380} fill="#4d9aef" />
                      </svg>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="bg-[#20242c] rounded-[8px] w-full p-[20px] hover:bg-[#262b35] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#8b92a3] text-[13px]">
                          <p className="leading-[normal]">PERFORMANCE RATING</p>
                        </div>
                        <div className="flex items-center gap-[12px]">
                          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic text-[#f1f3f9] text-[18px]">
                            <p className="leading-[normal]">Excellent</p>
                          </div>
                          <div className="content-stretch flex gap-[4px] items-center">
                            {[...Array(selectedEmployee.performance).keys()].map((_, i) => (
                              <div key={i} className="relative shrink-0 size-[16px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path d={svgPaths.p30025c80} fill="#F6D04C" />
                                </svg>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-[8px] items-center left-1/2 pb-[64px] pt-0 px-0 translate-x-[-50%]">
        <div className="bg-[#1a1c23] box-border content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[999px] shrink-0">
          <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[14px] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">{filteredEmployees.length === employees.length ? 'No Filters Applied' : `${filteredEmployees.length} Results`}</p>
          </div>
        </div>
        
        <div className="content-stretch flex items-center relative shrink-0 w-full">
          <div className="flex flex-row items-center self-stretch">
            <button className="bg-[#1a1c23] box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[16px] relative rounded-[999px] shadow-[0px_0px_15px_0px_rgba(65,61,90,0.05)] shrink-0 border border-[#444c5f] border-solid hover:bg-[#262b35] transition-colors">
              <svg className="relative shrink-0 size-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.p106a5880} fill="#F1F3F9" />
              </svg>
            </button>
          </div>
          <div className="bg-[#1a1c23] box-border content-stretch flex gap-[16px] items-center justify-center px-[24px] py-[16px] relative rounded-[999px] shadow-[0px_0px_15px_0px_rgba(65,61,90,0.05)] shrink-0 mx-[8px] border border-[#444c5f] border-solid">
            <button className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[14px] text-center text-nowrap hover:text-[#4d9aef] transition-colors">
              <p className="leading-[normal] whitespace-pre">Talent Card Explorer</p>
            </button>
            <svg className="relative shrink-0 size-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p10338a80} fill="#F1F3F9" />
            </svg>
            <button className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c1c8d5] text-[14px] text-center text-nowrap hover:text-[#f1f3f9] transition-colors">
              <p className="leading-[normal] whitespace-pre">Talent Card Details</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[224px]">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f1f3f9] text-[14px] w-full">
        <p className="leading-[normal]">{label}</p>
      </div>
      <div className="bg-[#1a1c23] min-w-[148px] relative shrink-0 w-full border border-[#f1f3f9] border-solid">
        <div className="flex flex-row items-center justify-center min-w-inherit size-full">
          <div className="box-border content-stretch flex gap-[16px] items-center justify-center min-w-inherit px-[16px] py-[8px] relative w-full">
            <div className="basis-0 flex flex-col font-['Segoe_UI:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#f1f3f9] text-[14px]">
              <p className="leading-[normal]">{value}</p>
            </div>
            <ChevronDown className="size-[24px] text-[#f1f3f9]" />
          </div>
        </div>
      </div>
    </div>
  );
}