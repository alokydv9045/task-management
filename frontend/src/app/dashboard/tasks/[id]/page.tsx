'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore, Task } from '@/store/useTaskStore';
import { 
  Lock, Eye, Share, MoreHorizontal, Maximize2, 
  Calendar as CalendarIcon, Tag, Link2, Plus, Settings, 
  Clock, Paperclip, Send, Smile, ChevronRight, ChevronLeft, ChevronDown, Check, Users, Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tasks } = useTaskStore();
  const { token } = useAuthStore();
  
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [subtasks, setSubtasks] = useState<Task[]>([]);

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      const found = tasks.find(t => t.id === params.id);
      if (found) setTask(found);

      if (token) {
        api.get(`/tasks/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            setTask(res.data);
            setSubtasks(res.data.subtasks || []);
          })
          .catch(console.error);

        api.get(`/tasks/${params.id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => setComments(res.data))
          .catch(console.error);
          
        api.get(`/tasks/${params.id}/history`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => setHistory(res.data))
          .catch(console.error);
      }
    }
  }, [params.id, tasks, token]);

  const handleAddComment = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newComment.trim() || !task || !token) return;
    
    setIsSubmitting(true);
    try {
      const res = await api.post(`/tasks/${task.id}/comments`, { content: newComment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full"></div>
      </div>
    );
  }

  const renderPriorityIcon = (priority: string, color: string) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("mr-1.5", color)}>
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
    </svg>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-500';
      case 'MEDIUM': return 'text-orange-500';
      case 'LOW': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const pColor = getPriorityColor(task.priority);

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950 overflow-hidden relative">
      
      {/* Main Content Column */}
      <div className="flex-1 overflow-y-auto px-10 py-8 scrollbar-thin">
        {/* Header Actions */}
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" size="sm" className="h-8 border-gray-200 dark:border-zinc-800 text-gray-500 rounded-md">
            <Lock className="w-4 h-4 mr-1.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-gray-200 dark:border-zinc-800 text-gray-500 rounded-md">
            <Eye className="w-4 h-4 mr-1.5" /> 1
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-gray-200 dark:border-zinc-800 text-gray-500 rounded-md">
            <Share className="w-4 h-4 mr-1.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 dark:border-zinc-800 text-gray-500 rounded-md">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 dark:border-zinc-800 text-gray-500 rounded-md">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Title & Desc */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{task.title}</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-2xl">
          {task.description || "Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively."}
        </p>

        {/* Properties Row */}
        <div className="grid grid-cols-[120px_1fr] gap-4 mb-4 items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Properties</span>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300">
              <span className="w-4 h-4 rounded-full bg-gray-300 dark:bg-zinc-600 flex items-center justify-center text-[9px]">A</span>
              Designer
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-500/10 text-xs font-medium text-red-600">
              <CalendarIcon className="w-3 h-3" />
              31 Jul
            </span>
          </div>
        </div>

        {/* Labels Row */}
        <div className="grid grid-cols-[120px_1fr] gap-4 mb-4 items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Labels</span>
          <div className="flex gap-2 flex-wrap">
            {['Research', 'Design', 'Development', 'Testing', 'Deployment'].map(label => (
              <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 dark:border-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                <Tag className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Resources Row */}
        <div className="grid grid-cols-[120px_1fr] gap-4 mb-10 items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Resources</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer hover:text-gray-600">
            <Link2 className="w-3 h-3" />
            Add document or link...
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ChevronDown className="w-4 h-4 text-black dark:text-white" />
            <h3 className="font-semibold">Subtasks</h3>
          </div>
          
          <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 text-xs font-semibold text-gray-500">
              <div className="flex-1">Task</div>
              <div className="w-32">Priority</div>
              <div className="w-32">Members</div>
              <div className="w-32">Due Date</div>
              <div className="w-12 text-right">Actions</div>
            </div>
            
            <div className="flex flex-col">
              {subtasks.length === 0 ? (
                <div className="px-4 py-4 text-sm text-gray-500 italic">No subtasks yet.</div>
              ) : (
                subtasks.map(st => {
                  const color = getPriorityColor(st.priority);
                  return (
                    <div key={st.id} className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                      <div className="flex-1 text-sm font-medium">{st.title}</div>
                      <div className="w-32 flex items-center text-xs font-semibold">
                        {renderPriorityIcon(st.priority, color)}
                        <span className={color}>{st.priority === 'HIGH' ? 'High' : st.priority === 'MEDIUM' ? 'Medium' : 'Low'}</span>
                      </div>
                      <div className="w-32 flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 border border-white dark:border-zinc-950 shadow-sm relative z-20">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${st.id}`} alt="User" />
                        </div>
                      </div>
                      <div className="w-32 text-sm text-gray-500">
                        {st.dueDate ? format(new Date(st.dueDate), 'dd MMM yyyy') : 'No date'}
                      </div>
                      <div className="w-12 flex justify-end">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="px-4 py-3 bg-white dark:bg-zinc-950 text-sm font-medium text-gray-600 hover:text-black cursor-pointer flex items-center gap-2">
              <Plus className="w-3 h-3" /> Add Subtasks
            </div>
          </div>
        </div>

        {/* Activity / Comments */}
        <div>
          <h3 className="font-semibold mb-4 text-sm">Activity</h3>
          
          <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden mb-4">
            {comments.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">No comments yet. Be the first to start the conversation!</div>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="p-4 border-b border-gray-100 dark:border-zinc-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author?.id || 'default'}`} alt="User" />
                      </div>
                      <span className="font-medium text-sm">{comment.author?.email?.split('@')[0] || 'User'}</span>
                      <span className="text-xs text-gray-400">{format(new Date(comment.createdAt), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 ml-8">{comment.content}</p>
                </div>
              ))
            )}
          </div>
          
          {/* Main Comment Input */}
          <form onSubmit={handleAddComment} className="border border-gray-200 dark:border-zinc-800 rounded-xl p-3 flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <div className="flex items-center gap-3">
              <Paperclip className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              <button type="submit" disabled={isSubmitting || !newComment.trim()}>
                <Send className={cn("w-4 h-4 cursor-pointer", newComment.trim() ? "text-blue-500" : "text-gray-400")} />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Right Sidebar Details */}
      <div className="w-80 border-l border-gray-200 dark:border-zinc-800 bg-gray-50/30 dark:bg-[#111] h-full overflow-y-auto p-4">
        
        {/* Details Accordion */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <ChevronDown className="w-4 h-4" /> Details
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Settings className="w-4 h-4" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-[80px_1fr] items-center text-sm">
              <span className="text-gray-500">Status</span>
              <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                Backlog
              </div>
            </div>
            
            <div className="grid grid-cols-[80px_1fr] items-center text-sm relative">
              <span className="text-gray-500">Priority</span>
              <div 
                className="flex items-center gap-1.5 font-medium cursor-pointer"
                onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              >
                {renderPriorityIcon(task.priority, getPriorityColor(task.priority))}
                <span className={getPriorityColor(task.priority)}>{task.priority === 'HIGH' ? 'High' : task.priority === 'MEDIUM' ? 'Medium' : 'Low'}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              
              {isPriorityOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPriorityOpen(false)} />
                  <div className="absolute left-20 top-6 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden py-1 text-sm animate-in fade-in">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500">Priority</div>
                    <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600">
                      <div className="w-1 h-1 rounded-full bg-gray-400 ml-1" /> No Priority
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800">
                      <div className="flex items-center gap-2 text-red-500 font-medium">
                        {renderPriorityIcon('HIGH', 'text-red-500')} Urgent
                      </div>
                      <Check className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 text-red-500 font-medium">
                      {renderPriorityIcon('HIGH', 'text-red-500')} High
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 text-orange-500 font-medium">
                      {renderPriorityIcon('MEDIUM', 'text-orange-500')} Medium
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-400 font-medium">
                      <div className="w-1 h-1 rounded-full bg-gray-400 ml-1" /> Low
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center text-sm">
              <span className="text-gray-500">Members</span>
              <div className="flex items-center gap-1.5 font-medium text-gray-600 cursor-pointer">
                <Users className="w-3.5 h-3.5" />
                Add members
              </div>
            </div>
            
            <div className="grid grid-cols-[80px_1fr] items-center text-sm relative">
              <span className="text-gray-500">Dates</span>
              <div className="flex items-center gap-1">
                <div 
                  className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 dark:border-zinc-800 text-xs font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800"
                  onClick={() => setIsDateOpen(!isDateOpen)}
                >
                  <CalendarIcon className="w-3 h-3 text-gray-400" /> 
                  Jan 10
                </div>
                <span className="text-gray-400 text-xs">→</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 dark:border-zinc-800 text-xs font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <CalendarIcon className="w-3 h-3 text-gray-400" /> 
                  End
                </div>
              </div>

              {isDateOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDateOpen(false)} />
                  <div className="absolute left-10 top-8 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-3 animate-in fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <ChevronLeft className="w-4 h-4 cursor-pointer" />
                      <span className="font-semibold text-sm">January 2026</span>
                      <ChevronRight className="w-4 h-4 cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2 font-medium">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                      <div className="text-gray-300">30</div>
                      <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
                      <div>7</div><div>8</div><div>9</div>
                      <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto">10</div>
                      <div>11</div><div>12</div><div>13</div>
                      <div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div>
                      <div>21</div><div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div>
                      <div>28</div><div>29</div><div>30</div><div>31</div>
                      <div className="text-gray-300">1</div><div className="text-gray-300">2</div><div className="text-gray-300">3</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center text-sm">
              <span className="text-gray-500">Labels</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                None
              </div>
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center text-sm">
              <span className="text-gray-500">Teams</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                None
              </div>
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center text-sm">
              <span className="text-gray-500">Reporter</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                None
              </div>
            </div>
          </div>
        </div>

        {/* Updates Accordion (History) */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-2 font-semibold text-sm mb-4">
            <ChevronDown className="w-4 h-4" /> Updates
          </div>
          
          <div className="relative pl-3 space-y-4">
            {/* Timeline Line */}
            {history.length > 0 && <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200 dark:bg-zinc-800" />}
            
            {history.length === 0 ? (
              <div className="text-xs text-gray-500 italic">No updates yet.</div>
            ) : (
              history.map(log => (
                <div key={log.id} className="relative flex gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 border border-white dark:border-zinc-950 z-10 shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.user?.id || 'default'}`} alt="User" />
                  </div>
                  <div>
                    <span className="font-semibold">{log.user?.email?.split('@')[0] || 'User'}</span>
                    <p className="text-gray-500 text-xs mt-0.5">{log.action}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">{format(new Date(log.createdAt), 'MMM d, h:mm a')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
